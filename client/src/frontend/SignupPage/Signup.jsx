import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../../index.css";
import "./Signup.css";
import { Link } from "react-router-dom";
import Axios from "axios";

const SignUp = () => {
  //   Déclare un state pour contenir et éditer la valeur des inputs
  const [details, setDetails] = useState({
    guestEmail: "",
    guestPassword: "",
  });

  //  UseRef pour obtenir le rôle 
  const guestRole = useRef();

  const getInputs = (e) => {
    const { value, name } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitValues = async (e) => {
    e.preventDefault();
    const setGuestRole = guestRole.current.value;

    const response = await Axios.post("http://localhost:3003/auth/signUp", {
      setGuestRole,
      ...details,
    });
    console.log(response);
    window.location.href = "/login";
    alert("Signed up successfully");
  };

  return (
    <>
      <Header />
      <div className="container formContainer">
        <div className="formCard">
          <h3>Inscription</h3>
          <span>Créer un compte</span>

          <form action="">
            <div className="inputDiv">
              <label htmlFor="email">Email utilisateur</label>
              <input
                type="email"
                placeholder="Entrez votre email"
                id="email"
                name="guestEmail"
                onChange={getInputs}
              />
              <input type="hidden" name="role" ref={guestRole} value="guest" />
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                id="password"
                name="guestPassword"
                onChange={getInputs}
              />
            </div>

            <button onClick={submitValues} className="btn">
              S'inscrire
            </button>
          </form>

          <span className="signUpBtn">
            Vous avez déjà un compte <Link to={"/login"}>S'inscrire</Link>{" "}
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
