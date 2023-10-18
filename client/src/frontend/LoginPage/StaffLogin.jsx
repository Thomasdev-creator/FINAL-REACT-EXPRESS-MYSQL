import React, { useEffect, useState } from "react";
import "../../index.css";
import "./Login.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

const apiUrl = import.meta.env.VITE_API_URL;

const StaffLogin = () => {
  //Créer un state qui contient les valeurs entrées par l'utilisateur
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const LoginUser = async (e) => {
    e.preventDefault();

    const response = await Axios.post(`${apiUrl}${ROUTES.AUTH_LOGINSTAFF}`, {
      userEmail: userEmail,
      password: userPassword,
    });

    if (response.data.auth == true) {
      setLoginStatus(true)
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }else{
      setLoginStatus(false)
      navigate("/staffLogin");
      alert('Email or Password entered are incorrect!')
    }
  };
  return (
    <>
      <Header />
      <div className="container formContainer">
        <div className="formCard">
          <h3>Connexion administrateur</h3>
          <span>Bienvenue</span>

          <form action="">
            <div className="inputDiv">
              <label htmlFor="userEmail">Votre email</label>
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
              <label htmlFor="password">Votre mot de passe</label>
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
              Connexion
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StaffLogin;
