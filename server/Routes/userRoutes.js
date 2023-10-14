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

router.put("/updateMyDetails", verifyToken, (req, res) => {
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

  router.get("/verifyUser", verifyToken, (req, res) => {
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
  
  
  router.get("/viewCheck", verifyToken, (req, res) => {
    if (req.userRole === "employe" || req.userRole === "guest") {
      res.json({ message: "no access" });
    } else {
      res.status(403).send("You do not have permission to access this page.");
    }
  });

  // Route pour obtenir tout les employées enregistrer en base de donnée
router.get("/getEmployes", (req, res) => {
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


// Suppression Employé
router.delete("/deleteEmploye/:id", (req, res) => {
    const employeId = req.params.id;
    //sql statement pour supprimer un employé
    const sql = "DELETE from users WHERE id = ?";
    // Query pour éxécuter le sql statement
    db.query(sql, employeId, (err, rows) => {
      if (err) return res.json(err);
      return res.json("Employe deleted successfully!");
    });
  });

  module.exports = router;