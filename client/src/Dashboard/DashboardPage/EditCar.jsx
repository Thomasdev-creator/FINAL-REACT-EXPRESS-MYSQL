import React, { useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

//Import des icônes
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../routes";


const apiUrl = import.meta.env.VITE_API_URL;

const EditCar = () => {
  const [carData, setCarData] = useState({
    carName: "",
    price: null,
    image: null,
    time: "",
    model: "",
    kilometer: null,
    safDescription: "",
    totalGuests: null,
  });

  const getData = (e) => {
    const { name, value } = e.target;
    // state pour vérifier qu'une image est bien présente dans le formulaire
    if (name === "image") {
      setCarData((prev) => ({ ...prev, image: e.target.files[0] }));
    } else {
      setCarData((prev) => ({ ...prev, [name]: value }));
    }
    console.log(carData);
  };

  // Obtenir l'id de la voiture pour mettre à jour
  const location = useLocation();
  const carID = location.pathname.split("/")[2];

  // Envoie des données au serveur
  const sendInputs = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("carName", carData.carName);
    formData.append("price", carData.price);
    formData.append("image", carData.image);
    formData.append("time", carData.time);
    formData.append("kilometer", carData.kilometer);
    formData.append("model", carData.model);
    formData.append("safDescription", carData.safDescription);
    formData.append("totalGuests", carData.totalGuests);

    await Axios.put(
      `${apiUrl}${ROUTES.CAR_UPDATECAR}`+ carID,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    window.location.href = `/carDetails/${carID}`;
  };

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Modifier</h1>
          <p>Modifier la description de cette voiture</p>
        </div>

        <form action="" encType="multipart/form-data">
          <div className="formDiv grid">
            <div className="fieldDiv ">
              <label htmlFor="carName">Nom</label>
              <input
                type="text"
                name="carName"
                onChange={getData}
                id="carName"
                placeholder="Nom voiture"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="price">Prix</label>
              <input
                type="number"
                name="price"
                onChange={getData}
                id="price"
                placeholder="Entrez le prix"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="image">Photo</label>
              <input type="file" name="image" onChange={getData} id="image" />
            </div>

            <div className="fieldDiv">
              <label htmlFor="time">Année</label>
              <input
                type="text"
                name="time"
                onChange={getData}
                id="time"
                placeholder="Entrez l'année"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                name="model"
                onChange={getData}
                id="model"
                placeholder="Entrez le model"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="kilometer">Kilometer</label>
              <input
                type="number"
                name="kilometer"
                onChange={getData}
                id="kilometer"
                placeholder="Entrez le nombre de kilomètres"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="totalGuests">Total avec options</label>
              <input
                type="number"
                name="totalGuests"
                onChange={getData}
                id="totalGuests"
                placeholder="Entrez le prix total avec options"
              />
            </div>

            <div className="fieldDiv">
              <label htmlFor="desc">Description</label>

              <textarea
                type="text"
                name="safDescription"
                id="desc"
                onChange={getData}
                placeholder="Entrez une description"
              ></textarea>
            </div>

            <button onClick={sendInputs} className="flex addCarBtn">
              Modifier description voiture <AiOutlinePlus className="icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCar;
