import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

// Import des icônes
import { AiOutlineSwapRight } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const VehiclesPage = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCars = async () => {
      const result = await Axios.get(`${apiUrl}/car/allCars/`);
      setCars(result.data);
    };
    getAllCars();
  }, []);

  const deleteCar = async (id) => {
    try {
      await Axios.delete(`${apiUrl}/car/deleteCar/` + id, {
        headers: {
          "delete-access-token": localStorage.getItem("token"),
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle flex">
          <div>
            <h1>Voitures</h1>
            <p>Voitures en vente</p>
          </div>
          <Link to={"/addCar"} className="btn flex">
            Ajouter une voiture <AiOutlinePlus className="icon" />
          </Link>
        </div>

        <div className="vehicleContainer grid">
          {cars.map((car) => (
            <div className="singleVehicle grid" key={car.id}>
              <div className="imgDiv">
                {car.image && (
                  <img
                    src={`../../../imagesFolder/${car.image}`}
                    alt="Car"
                  />
                )}
              </div>
              <div className="vehicleInfo">
                <span className="vehicleTitle">{car.name}</span>

                <div className="btns flex">
                  <Link to={`/carDetails/${car.id}`} className="btn flex">
                    Détail <AiOutlineSwapRight className="icon" />
                  </Link>
                  <button
                    onClick={() => deleteCar(car.id)}
                    className="btn flex"
                  >
                    Retirer <AiFillDelete className="icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
