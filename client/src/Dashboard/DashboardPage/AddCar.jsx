import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

//Import des icônes
import { AiOutlinePlus } from "react-icons/ai";

const AddCar = () => {
  //  Crée un state qui va être mis à jour
  const [carInfo, setCarInfo] = useState({
    carName: "",
    price: null,
    carImage: null,
    duration: "",
    model: "",
    kilometer: null,
    totalGuests: null,
    desc: "",
  });

  const getData = (e) => {
    const { name, value } = e.target;

    //Check si l'image est entré par l'utilisateur
    if (name === "carImage") {
      setCarInfo((prev) => ({ ...prev, carImage: e.target.files[0] }));
    } else {
      setCarInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const sendCarInfor = async (e) => {
    e.preventDefault();

    // créer une nouvelle instance de formdata
    const formData = new FormData();
    formData.append("carName", carInfo.carName);
    formData.append("price", carInfo.price);
    formData.append("carImage", carInfo.carImage);
    formData.append("duration", carInfo.duration);
    formData.append("model", carInfo.model);
    formData.append("kilometer", carInfo.kilometer);
    formData.append("totalGuests", carInfo.totalGuests);
    formData.append("desc", carInfo.desc);

    await Axios.post("http://localhost:3003/addCar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    window.location.href = "/vehiclesPage";
  };


   // check si l'utilisateur est autorisé à voir cette page
   useEffect(() => {
    const getToken = async () => {
      const res = await Axios.get("http://localhost:3003/viewCheck", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.message === "no access") {
        navigate("/dashboard");
      }
    };

    getToken();
  }, []);


  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Ajouter une nouvelle voiture</h1>
          <p>Entrez ci dessous le nouveau véhicule</p>
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
              <div className="fieldDiv">
                <label htmlFor="image">Photo</label>
                <input
                  type="file"
                  name="carImage"
                  onChange={getData}
                  id="image"
                />
              </div>
            </div>

            <div className="fieldDiv">
              <label htmlFor="time">Année</label>
              <input
                type="text"
                name="duration"
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
              <label htmlFor="kilometer">kilometer</label>
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
                name="desc"
                id="desc"
                onChange={getData}
                placeholder="Entrez une description"
              ></textarea>
            </div>

            <button onClick={sendCarInfor} className="flex addCarBtn">
              Ajouter voiture <AiOutlinePlus className="icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;

