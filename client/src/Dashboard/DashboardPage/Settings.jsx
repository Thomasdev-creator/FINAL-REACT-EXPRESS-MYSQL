import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";
import {useNavigate}  from 'react-router-dom'

//Import des icônes
import { AiOutlinePlus } from "react-icons/ai";

const apiUrl = import.meta.env.VITE_API_URL;

const Settings = () => {

  const navigate = useNavigate();

  const [newDetails, setNewDetails] = useState({
    firstName: "",
    secName: "",
    employeContact: null,
    employeEmail: "",
    password: "",
  });

  useEffect(() => {
    const getToken = async () => {
      const res = await Axios.get(`${apiUrl}/user/verifyUser/`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.message === "guest") {
        navigate("/settings");
      }
    };

    getToken();
  }, []);

  // Function pour obtenir tout les inputs par l'utilisateur
  const getInput = (e) => {
    const { value, name } = e.target;
    setNewDetails((prev) => ({ ...prev, [name]: value }));
  };

  // funtion pour envoyer inputs/details au serveur
  const updateMyDetails = async (e) => {
    e.preventDefault();
    const response = await Axios.put(
      `${apiUrl}/user/updateMyDetails/`,
      newDetails,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    if (response.data.message === "successful") {
      navigate("/login");
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Paramètres</h1>
          <p>Modifier vos informations ci-dessous</p>
        </div>

        <div className="formDiv grid">
          <div className="fieldDiv ">
            <label htmlFor="fName">Nom</label>
            <input
              type="text"
              name="firstName"
              onChange={getInput}
              id="fName"
              placeholder="Entrez un nom"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="sName">Prénom</label>
            <input
              type="text"
              name="secName"
              onChange={getInput}
              id="sName"
              placeholder="Entrez votre prénom"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="EmployeTel">Contact</label>
            <input
              type="number"
              name="employeContact"
              onChange={getInput}
              id="EmployeTel"
              placeholder="Entrez votre numéro de téléphone"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="EmployeEmail">Email</label>
            <input
              type="email"
              id="EmployeEmail"
              name="employeEmail"
              onChange={getInput}
              placeholder="Entrez votre email"
            />

            {/* */}
          </div>
          <div className="fieldDiv ">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="text"
              name="password"
              onChange={getInput}
              id="password"
              placeholder="Entrez votre mot de passe"
            />
          </div>

          <button onClick={updateMyDetails} className="btn flex">
            Enregistrer les modifications <AiOutlinePlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
