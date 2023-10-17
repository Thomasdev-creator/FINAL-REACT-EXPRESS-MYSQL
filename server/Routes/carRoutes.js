const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt');
const router = express.Router();
const { db } = require('../main');
require('dotenv').config();

app.use(cors());
// Middleware pour la gestion des données JSON
app.use(express.json());
app.use(express.static("imagesFolder"));
// Middleware pour la gestion des données de formulaire
app.use(express.urlencoded({ extended: true }));

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
router.post("/addCar", uploadImage.single("carImage"), (req, res) => {
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

  // Route pour fetch les voitures de la base de données
router.get("/allCars", (req, res) => {
    const sql = "SELECT * FROM vehicles";
    db.query(sql, (err, rows) => {
      if (err) return res.json(err);
      return res.json(rows);
    });
  });

  // Route pour fetch le détail des achats qua,d l'id est spécifié
router.get("/getCarDetails/:id", (req, res) => {
    //Specifie l'id de l'item
    const itemID = req.params.id;
    const sql = "SELECT * FROM vehicles WHERE id = ?";
    // run sql statement
    db.query(sql, itemID, (err, details) => {
      if (err) return res.json(err);
      return res.json(details);
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

  router.put("/updateCar/:id", upload.single("image"), (req, res) => {
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
router.delete("/deleteCar/:id", (req, res) => {
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
      res.json("No token");
    } else {
      jwt.verify(Token, process.env.JWT_SECRET, (err, decode) => {
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

  // Route to fetch Cars (Home Page) from the database
router.get("/allHomeCars", (req, res) => {
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

  // Route pour fetch achats de la base de données
router.get("/getCarName/:id", (req, res) => {
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

  module.exports = router;