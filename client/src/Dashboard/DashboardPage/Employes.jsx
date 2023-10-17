import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

// Import des icônes
import { BiEdit } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Employes = () => {
  // State pour enregistrer tout les utilisateurs de la base de données
  const [employes, setEmployes] = useState([]);
  // Id incrémenté
  let ID = 1;
  const navigate = useNavigate();

  // Function pour ce connecter au serveur et obtenir tout les employées
  useEffect(() => {
    const getEmployes = async () => {
      try {
        const res = await Axios.get(`${apiUrl}/user/getEmployes/`);
        setEmployes(res.data.rows);
      } catch (err) {
        console.log(err);
      }
    };
    getEmployes();
  }, []);

  // check si l'utilisateur est autorisé à voir cette page

  useEffect(() => {
    const getToken = async () => {
      const res = await Axios.get(`${apiUrl}/user/verifyUser/`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.message === "guest") {
        navigate("/dashboard");
      }
      else if(res.data.message === "employe"){
        navigate('/dashboard')
      }
    };

    getToken();
  }, []);

  // function pour supprimer l'employé
  const deleteEmploye = async (id) => {
    try {
      await Axios.delete(`${apiUrl}/user/deleteEmploye/` + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle flex">
          <div>
            <h1>Employé</h1>
            <p>Touts les employés</p>
          </div>

          <Link to={"/addEmploye"} className="btn flex">
            Ajouter un employé <AiOutlinePlus className="icon" />
          </Link>
        </div>

        <div className="tableDiv">
          <table>
            <thead>
            <tr className="tableHeaders flex">
              <th>ID</th>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            </thead>

            <tbody>
              {employes.map((employe) => (
                <tr className="tableRows flex" key={employe.id}>
                  <td>{ID++}</td>
                  <td>{employe.firstName}</td>
                  <td>{employe.contact}</td>
                  <td>{employe.email}</td>
                  <td>
                    <Link to={`/editEmploye/${employe.id}`} className="icon">
                      <BiEdit />
                    </Link>
                    <MdOutlineDeleteOutline
                      className="icon"
                      onClick={() => {
                        deleteEmploye(employe.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employes;
