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

// Route pour acheter une voiture
router.post("/bookCar", (req, res) => {
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

  // Route pour fetch tous les achats utilisateurs
router.get("/allSals", (req, res) => {
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
  router.get("/getGuestSals/:id", (req, res) => {
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

  // Route pour fetch achats quand l'id est spécifié
router.get("/singleSal/:id", (req, res) => {
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

  module.exports = router;
