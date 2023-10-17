import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";
import ROUTES from "../../routes";

// Import des icônes 

import { AiOutlineStar } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const CarDetails = () => {
  const [singleCar, setSingleCar] = useState([]);

  // Obtenir l'id des items
  const location = useLocation();
  const itemID = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchDetails = async () => {
      const results = await Axios.get(
        `${apiUrl}${ROUTES.GET_CAR_DETAILS}` + itemID
      );
      setSingleCar(results.data);
    };
    fetchDetails();
  }, []);

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle flex">
          <div>
            <h1>Voitures</h1>
            <p>Voitures en magasin</p>
          </div>
        </div>

        {singleCar.map((car) => (
          <div className="CarDetails grid" key={car.id}>
            <div className="imageDiv">
              <div className="imgText">
                <div className="stars flex">
                  <AiOutlineStar className="icon" />
                  <AiOutlineStar className="icon" />
                  <AiOutlineStar className="icon" />
                  <AiOutlineStar className="icon" />
                  <AiOutlineStar className="icon" />
                </div>
                <h3>{car.name}</h3>
              </div>
              {car.image && <img src={`../../../imagesFolder/${car.image}`} alt="Car"/>}
            </div>
            <div className="detailsInfo">
              <span className="title">Description véhicule</span>
              <p>{car.description}</p>
              <div className="specs grid">
                <span className="detailsDiv flex">
                  <small className="infor">{car.time}</small>
                </span>
                <span className="detailsDiv flex">
                  <small className="infor">Prix : {car.year} euros</small>
                </span>
                <span className="detailsDiv flex">
                  <small className="infor">Model : {car.model}  Kilometer : {car.kilometer} </small>
                </span>
              </div>

              <div className="actionButtons flex">
                <span className="price">{car.price} euros</span>
                <Link to={`/editCar/${car.id}`} className="btn buyBtn">
                  Modifier description
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDetails;
