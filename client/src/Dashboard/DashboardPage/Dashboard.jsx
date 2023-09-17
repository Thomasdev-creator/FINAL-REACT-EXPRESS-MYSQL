import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import { Link, useNavigate } from "react-router-dom";

// Import video
import Video from "../../assets/pexels-video.mp4";

// Import des icônes

import Axios from "axios";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const [sals, setSals] = useState([]);

  // const [carName, setCarName] = useState([]);

  useEffect(() => {
    const fetchSals = async () => {
      try {
        const res = await Axios.get("http://localhost:3003/threeSals");
        setSals(res.data.sals);

        const carNameID = res.data.sals[0].carID;
        const carID = await Axios.get(
          "http://localhost:3003/getCarName/" + carNameID
        );
        // const carName = carID.data.car[0].name;
      } catch (err) {Video
        console.log("Error occured");
      }
    };
    fetchSals();
  }, []);

  useEffect(() => {
    const getAllCars = async () => {
      const result = await Axios.get(
        "http://localhost:3003/allCarsDashboard"
      );
      setCars(result.data);
    };
    getAllCars();
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const res = await Axios.get("http://localhost:3003/verifyUser", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },

      });
      if (res.data.message === "employe") {
        navigate("/dashboard");

      }else if (res.data.message === "guest") {
        navigate("/dashboard");

      } else if (res.data.message === " ") {
        navigate("/login");
      }
    };

    getToken();
  }, []);

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="topSection">
          <div className="sectionTitle">
            <h1>Accueil</h1>
            <p>Gérez votre espace ici !</p>
          </div>

          <div className="video_Summary">
            <div className="flexLeft flex">
              <div className="videoDiv">
                <video src={Video} autoPlay loop muted></video>
              </div>
              <div className="videoText">
                <h4>Aston Martin</h4>

                <div className="btns flex">
                  <Link to={""} className="link bg">
                    Acheter
                  </Link>
                  <Link to={""} className="link ">
                    Voitures
                  </Link>
                </div>
              </div>
            </div>

            <div className="flexRight">
              <span>Véhicule acheté</span>
              {sals.map((sal) => (
                <div className="singleSal" key={sal.id}>
                  <span>{sal.carname}</span>
                  <div className="flex">
                    <small>{sal.year} </small>
                    <small>{sal.date} </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bottomSection">
          <span className="title">Toutes nos voitures</span>
          <div className="vehiclesContainer flex">
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
                  <div className="detailsDiv flex">

                    <small className="infor">
                      Kilomètres {car.year}
                    </small>
                  </div>

                  {/* */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
