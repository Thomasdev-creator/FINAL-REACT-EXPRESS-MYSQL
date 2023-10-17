import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

// Import des icônes
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const SalDetails = () => {
  const [salDetails, setSalDetails] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const salID = location.pathname.split("/")[2];

  useEffect(() => {
    const fecthDetails = async () => {
      await Axios.get(`${apiUrl}/sale/singleSal/` + salID).then(
        (res) => {
          setSalDetails(res.data.sal);
        }
      );
    };
    fecthDetails();
  });

  useEffect(() => {
    const getToken = async () => {
      const res = await Axios.get(`${apiUrl}/user/verifyUser`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.message === "guest") {
        navigate("/dashboard");
      } else if(res.data.message === "employe"){
        navigate('/dashboard')
      }
    };

    getToken();
  }, []);


  // Supprimer achat fonctionnalité
  const deleteSal = () => {
    Axios.delete(`${apiUrl}/deleteSal/` + salID);
    window.location.href = "/sals";
  };

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle flex">
          <div>
            <h1>Achats</h1>
            <p>Description des achats éfféctué par le client</p>
          </div>
        </div>

        <div className="detailContainer">
          <span className="topCard flex">
            <span>Aston Marin</span>
            <button onClick={deleteSal} className="btn flex">
              Supprimer <AiFillDelete className="icon" />
            </button>
          </span>

          {salDetails.map((sal) => {
            return (
              <div className="guestDetails grid" key={sal.id}>
                <div className="flex">
                  <span className="title">Nom</span>
                  <span>{sal.guestname}</span>
                </div>
                <div className="flex">
                  <span className="title">Nationalité</span>
                  <span>{sal.nationality}</span>
                </div>
                <div className="flex">
                  <span className="title">Téléphone</span>
                  <span>{sal.contact}</span>
                </div>
                <div className="flex">
                  <span className="title">Email</span>
                  <span>{sal.email}</span>
                </div>

                <div className="flex">
                  <span className="title">Date d'achat</span>
                  <span>{sal.date}</span>
                </div>
                <div className="flex">
                  <span className="title">Model année</span>
                  <span>{sal.year}</span>
                </div>

                <div className="flex">
                  <span className="title">Age</span>
                  <span>{sal.age}</span>
                </div>
                <div className="grid">
                  <span
                    className="title"
                    style={{
                      color: "#000000",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    Message
                  </span>
                  <span className="title">{sal.message}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalDetails;
