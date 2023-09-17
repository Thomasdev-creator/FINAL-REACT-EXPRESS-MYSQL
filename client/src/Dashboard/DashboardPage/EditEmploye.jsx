import React from "react";
import "./Dashboard.css";

//Import des icônes
import { AiOutlinePlus } from "react-icons/ai";

const EditEmploye = () => {
  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Modifier informations employé</h1>
          <p>Entrez vos modifications</p>
        </div>

        <div className="formDiv grid">
          <div className="fieldDiv ">
            <label htmlFor="EmployeName">Nom</label>
            <input type="text" id="EmployeName" placeholder="Entrez un nom" />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="EmployeTel">Contact</label>
            <input
              type="number"
              id="EmployeTel"
              placeholder="Entrez un numéro de téléphone"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="EmployeTel">Mot de passe</label>
            <input
              type="password"
              id="EmployeTel"
              placeholder="Entrez un mot de passe"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="EmployeTel">Utilisateur</label>
            <input
              type="text"
              id="EmployeTel"
              placeholder="Entrez un nom d'utilisateur"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="EmployeTel">Email</label>
            <input
              type="number"
              id="EmployeTel"
              placeholder="Entrez un email"
            />
          </div>

          <button className="btn flex">
          Enregister les modifications <AiOutlinePlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmploye;
