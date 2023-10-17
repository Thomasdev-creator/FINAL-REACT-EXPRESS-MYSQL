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

// Route pour vérifier que l'utilisateur est bien autorisé à accéder au tableau de bord

router.post("/loginUser", (req, res) => {
    const userEmailSent = req.body.userEmail;
    const userPasswordSent = req.body.password;
  
    // Notez que nous récupérons uniquement le mot de passe pour l'email donné
    const sql = "SELECT * from guests WHERE email = ?";
  
    db.query(sql, [userEmailSent], (err, rows) => {
      if (err) {
        console.log("Error accessing the database");
        return res.status(500).json({ message: "Error accessing the database" });
      }
  
      if (rows.length > 0) {
        const hashedPassword = rows[0].password;
  
        // Utilisation de bcrypt pour comparer les mots de passe
        bcrypt.compare(userPasswordSent, hashedPassword, function(err, result) {
          if (err) {
            return res.status(500).json({ message: "Erreur lors de la comparaison des mots de passe." });
          }
  
          if (result) { // Si les mots de passe correspondent
            const userID = rows[0].id;
            const userRole = rows[0].role;
            const userEmail = rows[0].email;
  
            const token = jwt.sign({ userID, userRole, userEmail }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
  
            return res.status(200).json({ auth: true, token, results: rows });
          } else {
            return res.json({ auth: false, message: "Invalid credentials" });
          }
        });
      } else {
        res.json({ auth: false, message: "No user found" });
      }
    });
  });
  
  
  // Route pour vérifier que l'utilisateur est bien autorisé à accéder au tableau de bord
  
  router.post("/loginStaff", (req, res) => {
    const userEmailSent = req.body.userEmail;
    const userPasswordSent = req.body.password;
  
    // Nous ne vérifions que l'email ici, pas le mot de passe
    const sql = "SELECT * from users WHERE email = ?";
  
    db.query(sql, [userEmailSent], (err, rows) => {
      if (err) {
        console.log("Error accessing the database");
        return res.status(500).json({ message: "Error accessing the database" });
      }
  
      if (rows.length > 0) {
        const hashedPassword = rows[0].password;
  
        // Utilisation de bcrypt pour comparer les mots de passe
        bcrypt.compare(userPasswordSent, hashedPassword, function(err, result) {
          if (err) {
            return res.status(500).json({ message: "Erreur lors de la comparaison des mots de passe." });
          }
  
          if (result) { // Si les mots de passe correspondent
            const userID = rows[0].id;
            const userRole = rows[0].role;
  
            const token = jwt.sign({ userID, userRole }, process.env.JWT_SECRET, {
              expiresIn: "1d",
            });
  
            return res.status(200).json({ auth: true, token, results: rows });
          } else {
            return res.json({ auth: false, message: "Invalid credentials" });
          }
        });
      } else {
        res.json({ auth: false, message: "No user found" });
      }
    });
  });
  
  
  //  Route inscription utilisateur
  router.post("/signUp", (req, res) => {
    const guestEmail = req.body.guestEmail;
    const plaintextPassword = req.body.guestPassword; // c'est le mot de passe en clair
    const guestRole = req.body.setGuestRole;
  
    const saltRounds = 10;  // définissez le nombre de tours de sel - 10 est généralement recommandé
    
    bcrypt.hash(plaintextPassword, saltRounds, function(err, hashedPassword) {
      if (err) {
        return res.json({error: 'Erreur lors du hachage du mot de passe.'});
      }
  
      const Values = [guestEmail, hashedPassword, guestRole];  // Utilisez le hashedPassword ici
  
      // SQL pour insérer des données
      const SQL = "INSERT INTO guests (email, password, role) VALUES (?,?,?)";
      // Exécute SQL
      db.query(SQL, Values, (err, rows) => {
        if (err) return res.json(err);
        return res.json(rows);
      });
    });
  });
  
  
  // Vérifie le token
  const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
  
    if (!token) {
      res.json("No token");
      res.redirect("/login");
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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

  module.exports = router;