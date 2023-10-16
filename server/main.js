const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt');
require('dotenv').config();

app.use(cors());
// Middleware pour la gestion des données JSON
app.use(express.json());
app.use(express.static("imagesFolder"));
// Middleware pour la gestion des données de formulaire
app.use(express.urlencoded({ extended: true }));

/*const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  socketPath: process.env.DB_SOCKET_PATH,
});*/


module.exports = {
  db, // Exportez la variable db
};

// Modules pour la gestion des routes

const adminRoutes = require('./Routes/adminRoutes'); // Chemin relatif vers adminDashboard.js
const authRoutes = require('./Routes/authRoutes'); // Chemin relatif vers authRoutes.js
const carRoutes = require('./Routes/carRoutes'); // Chemin relatif vers carRoutes.js
const saleRoutes = require('./Routes/saleRoutes'); // Chemin relatif vers saleRoutes.js
const userRoutes = require('./Routes/userRoutes'); // Chemin relatif vers userRoutes.js

// Utilisez les modules de routes en tant que middleware

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/car', carRoutes);
app.use('/sale', saleRoutes);
app.use('/user', userRoutes);

db.connect(function(err) {
  if (err) {
      console.error("Erreur lors de la connexion à la base de données :", err);
      process.exit(1); // Arrête le processus en cas d'erreur de connexion
  }
  console.log("Vous êtes bien connecté à la base de données !");
});

app.listen(3003, () => {
  console.log("Serveur en cours d'exécution sur le port 3003!");
});