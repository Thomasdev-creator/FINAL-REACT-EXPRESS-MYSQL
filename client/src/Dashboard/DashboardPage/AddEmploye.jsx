import React, { useRef, useState } from "react";
import "./Dashboard.css";

//Import des icônes
import { AiOutlinePlus } from "react-icons/ai";
import Axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const AddEmploye = () => {
  // State pour stocker les valeurs des inputs
  const [newEmploye, setNewEmploye] = useState({
    firstName: "",
    secName: "",
    employeContact: null,
    employeEmail: "",
    password: "",
    employeRole: "",
  });

  // UseRef pour obtenir la valeur
  const employeRole = useRef();

  //funtion pour obtenir les inputs de formulaire
  const getData = (e) => {
    const { name, value } = e.target;
    setNewEmploye((prev) => ({ ...prev, [name]: value }));
    console.log(newEmploye);
  };

  // funtion pour envoyer des informations au serveur
  const addEmploye = async (e) => {
    e.preventDefault();
    const currentEmployeRole = employeRole.current.value;
    await Axios.post(`${apiUrl}/admin/addEmploye`, {currentEmployeRole, ...newEmploye} ).then(() => {
      console.log("Employe created successfully");
      window.location.href = "/employes";
    });
  };

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Ajouter un employé</h1>
          <p>Ajouter un employé à l'entreprise</p>
        </div>

        <div className="formDiv grid">
          <div className="fieldDiv ">
            <label htmlFor="fName">Prénom</label>
            <input
              type="text"
              name="firstName"
              onChange={getData}
              id="fName"
              placeholder="Entrez le prénom"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="sName">Nom</label>
            <input
              type="text"
              name="secName"
              onChange={getData}
              id="sName"
              placeholder="Entrez le nom"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="EmployeTel">Contact</label>
            <input
              type="number"
              name="employeContact"
              onChange={getData}
              id="EmployeTel"
              placeholder="Entrez un numéro de téléphone"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="EmployeEmail">Email</label>
            <input
              type="email"
              id="EmployeEmail"
              name="employeEmail"
              onChange={getData}
              placeholder="Entrez un email"
            />

          </div>
          <div className="fieldDiv ">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              onChange={getData}
              id="password"
              placeholder="Entrez un mot de passe"
            />
          </div>

          <div className="fieldDiv ">
            <label htmlFor="EmployeRole">Role</label>
            <select ref={employeRole} onChange={getData}>
              <option value="employe">Employe</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <button onClick={addEmploye} className="btn flex">
            Ajouter employe <AiOutlinePlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmploye;
