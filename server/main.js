const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(express.static("imagesFolder"));


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  socketPath: process.env.DB_SOCKET_PATH,
});

// Route pour insérer un nouvel utilisateur/employé dans la base de données
app.post("/addEmploye", (req, res) => {
  // Variables pour contenir les données envoyées depuis le frontend
  const sentfirstName = req.body.firstName;
  const sentSecName = req.body.secName;
  const sentEmployeEmail = req.body.employeEmail;
  const sentEmployeContact = req.body.employeContact;
  const sentRole = req.body.currentEmployeRole;
  const sentPassword = req.body.password;

  // SQL stat pour insérer le détail
  const sql =
    "INSERT INTO users (firstName, secName, contact, email, password, role) VALUES(?,?,?,?,?,?)";
  const Values = [
    sentfirstName,
    sentSecName,
    sentEmployeContact,
    sentEmployeEmail,
    sentPassword,
    sentRole
  ];

  // query pour éxécuter SQL statement
  db.query(sql, Values, (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log("User inserted Success");
      res.send(rows);
    }
  });
});

// Route pour acheter une voiture
app.post("/bookCar", (req, res) => {
  const guestName = req.body.guestName;
  const nationality = req.body.nationality;
  const email = req.body.email;
  const age = req.body.age;
  const carName = req.body.carNameValue;
  const guestRole = req.body.guestRole;
  const contact = req.body.contact;
  const year = req.body.year;
  const arrivalDate = req.body.arrivalDate;
  const message = req.body.message;

  const Values = [
    guestName,
    year,
    carName,
    arrivalDate,
    nationality,
    contact,
    email,
    age,
    message,
    guestRole
  ];


  // SQL pour insérer des données
  const SQL =
    "INSERT INTO sals (guestname, year, carname, date, nationality,contact, email, age, message, role) VALUES (?,?,?,?,?,?,?,?,?,?)";
  // Execurte SQL
  db.query(SQL, Values, (err, rows) => {
    if (err) return res.json(err);
    return res.json(rows);
  });
});

// Route pour vérifier que l'utilisateur est bien autorisé à accéder au tableau de bord
app.post("/loginUser", (req, res) => {
  const userEmailSent = req.body.userEmail;
  const userPasswordSent = req.body.password;

  const sql = "SELECT * from guests where email =? && password = ?";

  // var sql = "Select A.*, B.* from users A, guests B";

  const Values = [userEmailSent, userPasswordSent];

  db.query(sql, Values, (err, rows) => {
    if (err) {
      console.log("Error access the databasde");
      res.status(500).json({ message: "Error access the database" });
    }
    if (rows.length > 0) {
      const userID = rows[0].id;
      const userRole = rows[0].role;
      const userEmail = rows[0].email;

      const token = jwt.sign({ userID, userRole, userEmail }, "myToken", {
        expiresIn: "1d",
      });
      res.status(200).json({ auth: true, token, results: rows });
    } else {
      res.json({ auth: false, message: "No user found" });
    }
  });
});

// Route pour vérifier que l'utilisateur est bien autorisé à accéder au tableau de bord
app.post("/loginStaff", (req, res) => {
  const userEmailSent = req.body.userEmail;
  const userPasswordSent = req.body.password;

  const sql = "SELECT * from users where email =? && password = ?";

  const Values = [userEmailSent, userPasswordSent];

  db.query(sql, Values, (err, rows) => {
    if (err) {
      console.log("Error access the databasde");
      res.status(500).json({ message: "Error access the database" });
    }
    if (rows.length > 0) {
      const userID = rows[0].id;
      const userRole = rows[0].role;

      const token = jwt.sign({ userID, userRole }, "myToken", {
        expiresIn: "1d",
      });
      res.status(200).json({ auth: true, token, results: rows });
    } else {
      res.json({ auth: false, message: "No user found" });
    }
  });
});

//  Route inscription utilisateur
app.post("/signUp", (req, res) => {
  const guestEmail = req.body.guestEmail;
  const guestPassword = req.body.guestPassword;
  const guestRole = req.body.setGuestRole;

  const Values = [guestEmail, guestPassword, guestRole];

  // SQL pour insérer des données
  const SQL = "INSERT INTO guests (email, password, role) VALUES (?,?,?)";
  // Execurte SQL
  db.query(SQL, Values, (err, rows) => {
    if (err) return res.json(err);
    return res.json(rows);
  });
});

// Vérifie le token
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.json("No token");
    res.redirect("/login");
  } else {
    jwt.verify(token, "myToken", (err, decoded) => {
      if (err) {
        return res.redirect("/login");
      }

      req.userID = decoded.userID;
      req.userRole = decoded.userRole; 
      req.userEmail = decoded.userEmail; 

      next();
    });
  }
};

app.get("/verifyUser", verifyToken, (req, res) => {
  if (req.id === "") {
    res.json({ message: "" });
  } else if (req.userRole === "guest") {
    res.json({ message: "guest" });
  } else if (req.userRole === "admin") {
    res.json({ message: "admin" });
  } else if (req.userRole === "employe") {
    res.json({ message: "employe" });
  } else {
    res.status(403).send("You do not have permission to access this page.");
  }
});


app.get("/viewCheck", verifyToken, (req, res) => {
  if (req.userRole === "employe" || req.userRole === "guest") {
    res.json({ message: "no access" });
  } else {
    res.status(403).send("You do not have permission to access this page.");
  }
});

app.put("/updateMyDetails", verifyToken, (req, res) => {
  const myID = req.userID;

  const firstName = req.body.firstName;
  const secName = req.body.secName;
  const employeContact = req.body.employeContact;
  const employeEmail = req.body.employeEmail;
  const password = req.body.password;

  // SQL mes à jour le détail utilisateur quand id est égale à l'id de l'utilisateur
  const SQL =
    "UPDATE users SET `firstName`=?, `secName`=?, `contact`=?,   `email`=?, `password`=? WHERE id = ?";
  const Values = [firstName, secName, employeContact, employeEmail, password];


  db.query(SQL, [...Values, myID], (err, rows) => {
    if (err) {
      res.json("Error encountered");
    } else {
      res.json({ message: "successful" });
    }
  });
});

// Obtenir tout les achats de l'utilisateur
app.get("/guestSals", verifyToken, (req, res) => {
  const guestEmail = req.userEmail;

  //Sql statetement pour obtenir les achats de l'utilisateur
  const SQL = "SELECT * FROM sals WHERE email = ?";

  // Statement pour lancer sql query
  db.query(SQL, guestEmail, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "We found some sals", sals: rows });
    } else {
      res.status(200).json([], { message: "No sals found!" });
      console.log("No sals found");
    }
  });
});

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/imagesFolder");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadImage = multer({ storage: imageStorage });

// Route pour ajouter une voiture
app.post("/addCar", uploadImage.single("carImage"), (req, res) => {
  const carName = req.body.carName;
  const price = req.body.price;
  const desc = req.body.desc;
  const duration = req.body.duration;
  const model = req.body.model;
  const totalGuests = req.body.totalGuests;
  const kilometer = req.body.kilometer;
  const carImage = req.file;

  // SQL statement pour ajouter des données venant du frontend
  const SQL =
    "INSERT INTO vehicles (name, price, image, time, year, model, description, kilometer) VALUES (?,?,?,?,?,?,?,?)";
  const Values = [
    carName,
    price,
    carImage.filename,
    duration,
    totalGuests,
    model,
    desc,
    kilometer,
  ];

  // Query pour lancer SQL statement
  db.query(SQL, Values, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

// Route pour fetch tous les achats utilisateurs
app.get("/allSals", (req, res) => {
  //Sql statement pour séléctionner les items de la base de données
  const SQL = "SELECT * FROM sals";

  // Statement pour run SQL query
  db.query(SQL, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "We found some sals", sals: rows });
    } else {
      res.status(200).json([]);
    }
  });
});


// Route pour feth les achats utilisateurs
app.get("/getGuestSals/:id", (req, res) => {
  const guestID = req.params.id
  //Sql statement pour séléctionner les items de la base de données
  const SQL = "SELECT * FROM sals where id = ?";

  // Statement pour run SQL query
  db.query(SQL, guestID,  (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "We found some sals", sals: rows });
    } else {
      res.status(200).json([]);
    }
  });
});


// Route pour fetch trois achats utilisateurs
app.get("/threeSals", (req, res) => {
  //Sql statement pour sélectionner les items de la base de données
  const SQL = "SELECT * FROM sals limit 3";

  // Statement pour run SQL query
  db.query(SQL, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res
        .status(200)
        .json({ message: "We found some sals", sals: rows });
    } else {
      res.status(200).json([]);
    }
  });
});

// Route pour fetch achats quand l'id est spécifié
app.get("/singleSal/:id", (req, res) => {
  //Sql statement pour séléctionner les items de la base de données
  const singleSalID = req.params.id;
  const SQL = "SELECT * FROM sals WHERE id =?";

  // Statement pour run SQL query
  db.query(SQL, singleSalID, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res.status(200).json({ message: "We found the sal", sal: rows });
    } else {
      res.status(200).json([]);
    }
  });
});

// Route pour fetch le détail des achats qua,d l'id est spécifié
app.get("/getCarDetails/:id", (req, res) => {
  //Specifie l'id de l'item
  const itemID = req.params.id;
  const sql = "SELECT * FROM vehicles WHERE id = ?";
  // run sql statement
  db.query(sql, itemID, (err, details) => {
    if (err) return res.json(err);
    return res.json(details);
  });
});

// Route pour fetch les voitures de la base de données
app.get("/allCars", (req, res) => {
  const sql = "SELECT * FROM vehicles";
  db.query(sql, (err, rows) => {
    if (err) return res.json(err);
    return res.json(rows);
  });
});

// Route to fetch Cars (Home Page) from the database
app.get("/allHomeCars", (req, res) => {
  const sql = "SELECT * FROM vehicles ORDER BY RAND() LIMIT 6";
  db.query(sql, (err, rows) => {
    if (err) return res.json(err);
    if (rows.length > 0) {
      return res.json(rows);
    } else {
      return res.json([]);
    }
  });
});

// Route pour fetch les voitures de la base de données(admin/dashboard)
app.get("/allCarsDashboard", (req, res) => {
  const sql = "SELECT * FROM vehicles ORDER BY RAND() LIMIT 4";
  db.query(sql, (err, rows) => {
    if (err) return res.json(err);

    if (rows.length > 0) {
      return res.json(rows);
    } else {
      return res.json([]);
    }
  });
});

// Route pour fetch achats de la base de données
app.get("/getCarName/:id", (req, res) => {
  //Sql statement pour séléctionner les items de la base de données
  const SQL = "SELECT * FROM vehicles WHERE id = ?";
  const carID = req.params.id;

  // Statement pour run SQL query
  db.query(SQL, carID, (err, rows) => {
    if (err) {
      res.status(500).json({ Message: "An incident happened to the server" });
    }
    if (rows.length > 0) {
      res.status(200).json({ message: "We found it", car: rows });
    } else {
      res.status(200).json([]);
    }
  });
});

// Route pour obtenir tout les employées enregistrer en base de donnée
app.get("/getEmployes", (req, res) => {
  // SQL statement
  const sql = "SELECT * FROM users WHERE role = ?";
  const role = ["employe"];
  // Query pour run sql statement
  db.query(sql, role, (err, rows) => {
    if (err) {
      res.json(err);
    }
    if (rows.length > 0) {
      res.json({ rows: rows });
    } else {
      res.json({ rows: "No employe found in the database!" });
    }
  });
});




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/imagesFolder");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.put("/updateCar/:id", upload.single("image"), (req, res) => {
  const carID = req.params.id;

  // Toutes les données envoyées depuis le frontend
  const carName = req.body.carName;
  const price = req.body.price;
  const safDescription = req.body.safDescription;
  const time = req.body.time;
  const model = req.body.model;
  const kilometer = req.body.kilometer;
  const totalGuests = req.body.totalGuests;
  const image = req.file;

  // sql pour modifier une voiture
  const sql =
    "UPDATE vehicles SET `name`=?, `price`=?, `image`=?, `time`=?, `model`=?, `description`=?, `year`=?, `kilometer`=? WHERE id =?";

  const Values = [
    carName,
    price,
    image.filename,
    time,
    model,
    safDescription,
    kilometer,
    totalGuests,
  ];

  // Statement pour éxecuter sql
  db.query(sql, [...Values, carID], (err, rows) => {
    if (err) return res.json(err);
    return res.json(rows);
  });
});

// Opérations de suppression
// Suppression de voiture
app.delete("/deleteCar/:id", (req, res) => {
  const carID = req.params.id;

  // sql pour supprimer
  const sql = "DELETE FROM vehicles where id = ?";
  // run sql statement
  db.query(sql, carID, (err, rows) => {
    if (err) return res.json(err);
    return res.json("Car Delete Successfully!");
  });
});

const verifyDelete = (req, res, next) => {
  const deleteToken = req.headers["delete-access-token"];
  if (!deleteToken) {
    res.json("No token bro");
  } else {
    jwt.verify(token, "myToken", (err, decode) => {
      if (err) {
        res.json("need to verify token");
      }
      req.deletePermission = decode.userRole;
      if (req.deletePermission === "admin") {
        next();
      }
    });
  }
};

// Supprime achat
app.delete("/deleteSal/:id", (req, res) => {
  const salID = req.params.id;

  // SQL statement
  const sql = "DELETE from sals WHERE id = ?";
  // Qyeury pour run sql statment
  db.query(sql, salID, (err, row) => {
    if (err) return res.json(err);
    return res.json(row);
  });
});

// Suppression Employé
app.delete("/deleteEmploye/:id", (req, res) => {
  const employeId = req.params.id;
  //sql statement pour supprimer un employé
  const sql = "DELETE from users WHERE id = ?";
  // Query pour éxécuter le sql statement
  db.query(sql, employeId, (err, rows) => {
    if (err) return res.json(err);
    return res.json("Employe deleted successfully!");
  });
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

app.listen(3003, () => {
  console.log("Server is running!");
});


