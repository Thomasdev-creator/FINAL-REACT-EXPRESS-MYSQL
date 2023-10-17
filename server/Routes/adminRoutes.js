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

app.use(cors(/*{
  origin: 'http://votre-domaine-frontend.com' // Limitez les accès en spécifiant votre domaine
}*/));
// Middleware pour la gestion des données JSON
app.use(express.json());
app.use(express.static("imagesFolder"));
// Middleware pour la gestion des données de formulaire
app.use(express.urlencoded({ extended: true }));

// Vérifie le token
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
      return res.status(403).json({ message: "No token" }).redirect("/login");
  }

  jwt.verify(token, process.env.JWT_SECRET, proc, (err, decoded) => {
      if (err) {
          return res.status(401).redirect("/login");
      }

      req.userID = decoded.userID;
      req.userRole = decoded.userRole; 
      req.userEmail = decoded.userEmail; 

      next();
  });
};

// Route pour fetch les voitures de la base de données(admin/dashboard)
router.get("/allCarsDashboard", (req, res) => {
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

  // Route pour insérer un nouvel utilisateur/employé dans la base de données
router.post("/addEmploye", async (req, res) => {
    // Variables pour contenir les données envoyées depuis le frontend
    const sentfirstName = req.body.firstName;
    const sentSecName = req.body.secName;
    const sentEmployeEmail = req.body.employeEmail;
    const sentEmployeContact = req.body.employeContact;
    const sentRole = req.body.currentEmployeRole;
    const sentHashedPassword = req.body.password;

    try {
     // Hasher le mot de passe avant de le stocker
     const hashedPassword = await bcrypt.hash(sentHashedPassword, 10);
  
    // SQL stat pour insérer le détail
    const sql =
      "INSERT INTO users (firstName, secName, contact, email, password, role) VALUES(?,?,?,?,?,?)";
    const Values = [
      sentfirstName,
      sentSecName,
      sentEmployeContact,
      sentEmployeEmail,
      hashedPassword,
      sentRole
    ];
  
    // query pour éxécuter SQL statement
    db.query(sql, Values, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Erreur lors de l'insertion." });
      } else {
        res.status(201).json({ message: "Utilisateur inséré avec succès." });
      }
      
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du hashage du mot de passe." });
    }
  });

// Supprime achat
router.delete("/deleteSal/:id", (req, res) => {
    const salID = req.params.id;
  
    // SQL statement
    const sql = "DELETE from sals WHERE id = ?";
    // Qyeury pour run sql statment
    db.query(sql, salID, (err, row) => {
      if (err) return res.json(err);
      return res.json(row);
    });
  });

  // Obtenir tout les achats de l'utilisateur
router.get("/guestSals", verifyToken, (req, res) => {
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

  // Route pour fetch trois achats utilisateurs
router.get("/threeSals", (req, res) => {
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

  module.exports = router;