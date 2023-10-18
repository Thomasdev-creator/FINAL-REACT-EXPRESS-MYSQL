import React, { useRef, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../../index.css";
import "./Signup.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import ROUTES from "../../routes";

const apiUrl = import.meta.env.VITE_API_URL;

const SignUp = () => {
  // Expressions régulières pour la validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const passwordRegex = /^.{6,}$/;

  // State pour les détails d'inscription
  const [details, setDetails] = useState({
    guestEmail: "",
    guestPassword: "",
  });

  // States pour suivre la validité de l'e-mail et du mot de passe
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  
  // State pour suivre l'acceptation des documents
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // UseRef pour obtenir le rôle 
  const guestRole = useRef();

  // Fonction pour obtenir et valider les entrées
  const getInputs = (e) => {
    const { value, name } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));

    if (name === "guestEmail") {
      setIsValidEmail(emailRegex.test(value));
    } else if (name === "guestPassword") {
      setIsValidPassword(passwordRegex.test(value));
    }
  };

  const submitValues = async (e) => {
    e.preventDefault();

    if (!hasAcceptedTerms) {
      alert("Veuillez accepter les termes et conditions pour vous inscrire.");
      return;
    }

    const setGuestRole = guestRole.current.value;
    const response = await Axios.post(`${apiUrl}${ROUTES.AUTH_SIGNUP}`, {
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
                autoComplete="email"
                onChange={getInputs}
                style={
                  isValidEmail ? { borderColor: "green" } : { borderColor: "red" }
                }
              />
              {isValidEmail && details.guestEmail !== "" ? 
                <p style={{ color: "green" }}>Email valide!</p> : 
                !isValidEmail && details.guestEmail !== "" ? 
                <p style={{ color: "red" }}>Email invalide!</p> : null}
              
              <input type="hidden" name="role" ref={guestRole} value="guest" />
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                id="password"
                name="guestPassword"
                autoComplete="current-password"
                onChange={getInputs}
                style={
                  isValidPassword ? { borderColor: "green" } : { borderColor: "red" }
                }
              />
              {isValidPassword && details.guestPassword !== "" ? 
                <p style={{ color: "green" }}>Mot de passe valide!</p> : 
                !isValidPassword && details.guestPassword !== "" ? 
                <p style={{ color: "red" }}>Le mot de passe doit comporter au moins 6 caractères!</p> : null}
            </div>

            <div className="inputDiv">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                onChange={() => setHasAcceptedTerms(!hasAcceptedTerms)}
              />
              <label htmlFor="acceptTerms">
              J'accepte les <a href="/legal/cgu.txt" target="_blank" rel="noopener noreferrer">CGU</a>,
              <a href="/legal/cgv.txt" target="_blank" rel="noopener noreferrer">CGV</a>,
              la <a href="/legal/privacy.txt" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>, 
              et les <a href="/legal/cookies.txt" target="_blank" rel="noopener noreferrer">Cookies</a>.
              </label>
            </div>

            <button onClick={submitValues} className="btn">
              S'inscrire
            </button>
          </form>

          <span className="signUpBtn">
            Vous avez déjà un compte <Link to={"/login"}>Se connecter</Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
