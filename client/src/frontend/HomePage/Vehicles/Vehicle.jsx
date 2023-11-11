import React, { useEffect, useState } from "react";
import "./Vehicle.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import ROUTES from "../../../routes";

// Import des icônes
import { AiOutlineSwapRight } from "react-icons/ai";

const apiUrl = import.meta.env.VITE_API_URL;

const Vehicle = () => {
  const [cars, setCars] = useState([]);
  const [sortOrder, setSortOrder] = useState("croissant"); // État pour le tri

  // UseEffect pour obtenir des données via le serveur
  useEffect(() => {
    const getData = async () => {
      try {
        const results = await Axios.get(`${apiUrl}${ROUTES.CAR_ALLHOMECARS}`);
        setCars(results.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // UseEffect pour trier les voitures quand sortOrder change
  useEffect(() => {
    const sortedCars = [...cars].sort((a, b) => {
      return sortOrder === "croissant" ? a.price - b.price : b.price - a.price;
    });
    setCars(sortedCars);
  }, [sortOrder]);

  return (
    <div className="vehicles container section">
      <div className="secContainer">
        <span className="secTitle">
          Voitures disponibles
          <p>Voir tout nos véhicules disponibles en magasin</p>
        </span>

        {/* Sélecteur pour le tri */}
        <div>
          <label htmlFor="sortOrder" style={{ marginRight: '10px' }}>Trier par prix: </label>
          <select 
            id="sortOrder" 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="croissant">Prix croissant</option>
            <option value="décroissant">Prix décroissant</option>
          </select>
        </div>

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
                    <small className="infor">Kilomètres : {car.year}</small>
                  </div>
                  <div className="detailsDiv flex">
                    <small className="infor">Année : {car.time}</small>
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

/*import React, { useEffect, useState } from "react";
import "./Vehicle.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import ROUTES from "../../../routes";


const apiUrl = import.meta.env.VITE_API_URL;
// Import des icônes

import { AiOutlineSwapRight } from "react-icons/ai";

const Vehicle = () => {
  // State pour contenir les données
  const [cars, setCars] = useState([]);

  // UseEffect pour obtenir des données via le serveur
  useEffect(() => {
    
    const getData = async () => {
      try{

        const results = await Axios.get(`${apiUrl}${ROUTES.CAR_ALLHOMECARS}`);
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
                    Kilomètres : {car.year}
                  </small>
                </div>
                <div className="detailsDiv flex">

                  <small className="infor">
                    Année : {car.time}</small>
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
*/
