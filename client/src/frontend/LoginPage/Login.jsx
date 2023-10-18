import React, { useEffect, useState } from "react";
import "../../index.css";
import "./Login.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Simple regex for email validation
  const passwordRegex = /^.{6,}$/;

  const handleEmailChange = (event) => {
    const email = event.target.value;
    if (!emailRegex.test(email)) {
      setEmailError("L'email n'est pas valide");
    } else {
      setEmailError(null);
    }
    setUserEmail(email);
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    if (!passwordRegex.test(password)) {
      setPasswordError("Le mot de passe doit avoir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre.");
    } else {
      setPasswordError(null);
    }
    setUserPassword(password);
  };

  const LoginUser = async (e) => {
    e.preventDefault();

    if (emailError || passwordError || !userEmail || !userPassword) {
      alert("Veuillez vérifier vos informations de connexion.");
      return;
    }

    try {
      const response = await Axios.post(`${apiUrl}${ROUTES.AUTH_LOGINUSER}`, {
        userEmail,
        password: userPassword,
      });

      if (response.data.auth) {
        setLoginStatus(true);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        alert("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur de connexion", error);
      navigate("/login");
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
                onChange={handleEmailChange}
              />
              {emailError && <div className="error">{emailError}</div>}
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
              {passwordError && <div className="error">{passwordError}</div>}
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
