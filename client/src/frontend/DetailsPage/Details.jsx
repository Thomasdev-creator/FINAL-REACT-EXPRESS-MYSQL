import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./Details.css";
import "../HomePage/Vehicles/Vehicle.css";
import Axios from "axios";

// Import des icônes

import { AiOutlineStar } from "react-icons/ai";
import Vehicle from "../HomePage/Vehicles/Vehicle";
import { useLocation } from "react-router-dom";
import ROUTES from "../../routes";


const apiUrl = import.meta.env.VITE_API_URL;

const Details = () => {
  // State pour contenir les données
  const [carDetails, setcarDetails] = useState([]);
  const [inputs, setInputs] = useState({
    guestName: "",
    nationality: "",
    email: "",
    age: null,
    carName: "",
    contact: null,
    year: null,
    arrivalDate: "",
    price: null,
    kilometer: null,
    message: "",
  });

  //Obtenir l'id de la voiture
  const location = useLocation();
  const carID = location.pathname.split("/")[2];

  // useEffect pour fetch les données
  useEffect(() => {
    const fetchDetails = async () => {
      const results = await Axios.get(
        `${apiUrl}${ROUTES.GET_CAR_DETAILS}` + carID
      );
      setcarDetails(results.data);
    };
    fetchDetails();
  }, []);

  // Function pour obtenir des données du formulaire
  const getData = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Utilise useRef pour obtenir les valeurs sans utiliser onChange function
  const carNameRef = useRef();
  const roleRef = useRef();

  // Function pour envoyer des données au serveur
  const bookCar = async (e) => {
    e.preventDefault();
    const carNameValue = carNameRef.current.value;
    const guestRole = roleRef.current.value;

    try {
      await Axios.post(`${apiUrl}${ROUTES.SALE_BOOKCAR}`, {
        carNameValue, guestRole,
        ...inputs,
      }).then(() => {
        window.location.reload();
      });
    } catch (err) {
      console.log("error bro" + err);
    }
  };

  return (
    <>
      <Header />
      {carDetails.map((carDetail) => (
        <div className="detailsPage grid container" key={carDetail.id}>
          <div className="imageDiv">
            <div className="imgText">
              <div className="stars flex">
                <AiOutlineStar className="icon" />
                <AiOutlineStar className="icon" />
                <AiOutlineStar className="icon" />
                <AiOutlineStar className="icon" />
                <AiOutlineStar className="icon" />
              </div>
              <h3>{carDetail.name}</h3>
            </div>
            {carDetail.image && (
              <img
                src={`../../../imagesFolder/${carDetail.image}`}
                alt="Car"
              />
            )}
          </div>
          <div className="detailsInfo">
            <span className="title">A propos de ce véhicule</span>
            <p>{carDetail.description}</p>
            <div className="specs grid">
              <span className="detailsDiv flex">
                <small className="infor">{carDetail.time}</small>
              </span>
              <span className="detailsDiv flex">
                <small className="infor">
                  Année : {carDetail.year} 
                </small>
              </span>
              <span className="detailsDiv flex">
                <small className="infor">
                  Model : {carDetail.model}, Kilometer : {carDetail.kilometer}
                </small>
              </span>
            </div>

            <div className="actionButtons flex">
              <span className="price">Prix : {carDetail.price} euros</span>
            </div>

            <div className="salForm">
              <span className="title">Formulaire d'achat</span>
              <p>
                Compléter ce formulaire pour devenir propriétaire
              </p>

              {/* Formulaire achat */}

              <div className="gridContainer grid">
                <div className="inputDiv">
                  <label htmlFor="carname">Model voiture</label>
                  <input
                    type="text"
                    id="carname"
                    name="carname"
                    ref={carNameRef}
                    onChange={getData}
                    value={carDetail.name}
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="role"
                    ref={roleRef}
                    onChange={getData}
                    value="guest"
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="carPrice"
                    onChange={getData}
                    value={carDetail.price}
                  />
                  <input
                    type="hidden"
                    name="kilometer"
                    onChange={getData}
                    value={carDetail.kilometer}
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="name">Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="guestName"
                    onChange={getData}
                    placeholder="Entrez votre nom"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="Nationality">Nationalité</label>
                  <input
                    type="text"
                    id="Nationality"
                    name="nationality"
                    onChange={getData}
                    placeholder="Entrez votre nationalité"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="number">Contact</label>
                  <input
                    type="number"
                    id="number"
                    name="contact"
                    onChange={getData}
                    placeholder="Entrez votre numéro de téléphone"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={getData}
                    placeholder="Entrez votre email"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="year">Année</label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    onChange={getData}
                    placeholder="Entrez l'année du véhicule"
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    onChange={getData}
                    placeholder="Entrez votre age"
                  />
                </div>

                <div className="inputDiv">
                  <label htmlFor="time">Date d'achat</label>
                  <input
                    type="datetime-local"
                    id="time"
                    name="arrivalDate"
                    onChange={getData}
                  />
                </div>

                <div className="inputDiv">
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    onChange={getData}
                    id="message"
                    placeholder="Entrez votre message"
                  ></textarea>
                </div>

                <button onClick={bookCar} className="btn">
                  Acheter voiture
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Vehicle />
      <Footer />
    </>
  );
};

export default Details;
