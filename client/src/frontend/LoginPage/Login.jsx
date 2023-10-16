import React, { useEffect, useState } from "react";
import "../../index.css";
import "./Login.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  //Crée un state pour contenir les valeurs entrées par l'utilsateur
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  

  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const LoginUser = async (e) => {
    e.preventDefault();

    const response = await Axios.post("http://localhost:3003/auth/loginUser", {
      userEmail: userEmail,
      password: userPassword,
    });

    // localStorage.setItem(userEmail)

    if (response.data.auth == true) {
      console.log('true')
      setLoginStatus(true);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      setLoginStatus(false);
      navigate("/login");
      alert("User name or passwords are incorrect");
    }
  };
  return (
    <>
      <Header />
      <div className="container formContainer">
        <div className="formCard">
          <h3>Connexion</h3>
          <span>Bienvenue</span>

          <form action="">
            <div className="inputDiv">
              <label htmlFor="userEmail">Email utilisateur</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                autoComplete="email"
                onChange={(event) => {
                  setUserEmail(event.target.value);
                }}
              />
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                autoComplete="current-password"
                onChange={(event) => {
                  setUserPassword(event.target.value);
                }}
              />
            </div>

            <button onClick={LoginUser} className="btn">
              Se connecter
            </button>
          </form>

          <span className="signUpBtn">
            Pas encore de compte <Link to={"/signup"}>Inscrivez-vous</Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
