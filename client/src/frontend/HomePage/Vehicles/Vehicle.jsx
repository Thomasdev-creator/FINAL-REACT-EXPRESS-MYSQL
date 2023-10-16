import React, { useEffect, useState } from "react";
import "./Vehicle.css";
import { Link } from "react-router-dom";
import Axios from "axios";

// Import des icônes

import { AiOutlineSwapRight } from "react-icons/ai";

const Vehicle = () => {
  // State pour contenir les données
  const [cars, setCars] = useState([]);

  // UseEffect pour obtenir des données via le serveur
  useEffect(() => {
    
    const getData = async () => {
      try{

        const results = await Axios.get("http://localhost:3003/car/allHomeCars");
        console.log(results.data)
        setCars(results.data);
      }catch(error){
        console.error(error)
      }
    };
    getData();
  }, []);

  return (
    <div className="vehicles container section">
      <div className="secContainer">
        <span className="secTitle">
          Voitures disponibles
          <p>Voir tout nos véhicules disponibles en magasin</p>
        </span>

        <div className="vehicleContainer grid">
          {Array.isArray(cars) && cars.length > 0 ? (
            cars.map((car) => (
            <div className="singleVehicle grid" key={car.id}>
              <div className="imgDiv">
                {car.image && (
                  <img
                    src={`../../../imagesFolder/${car.image}`}
                    alt="Car"
                  />
                )}
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="3000"
                className="vehicleInfo"
              >
                <span className="vehicleTitle">{car.name}</span>
                <div className="detailsDiv flex">

                  <small className="infor">
                    Kilometer : {car.year}
                  </small>
                </div>
                <div className="detailsDiv flex">

                  <small className="infor">{car.time}</small>
                </div>

                <Link to={`/details/${car.id}`} className="btn flex">
                  Voir le détail <AiOutlineSwapRight className="icon" />
                </Link>
              </div>

              <span className="price">{car.price} euros</span>
            </div>
          ))
          ) : (
            <p>Aucune voiture disponible pour le moment</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
