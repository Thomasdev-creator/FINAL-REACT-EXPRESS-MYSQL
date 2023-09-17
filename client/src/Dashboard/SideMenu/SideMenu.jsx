import React, { useEffect } from "react";
import "../SideMenu/SideMenu.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

// Import Logo
import Logo from "../../assets/voiture-principale.png";

const SideMenu = () => {

  const navigate = useNavigate();

  // Au moment de la déinscription, check utilisateur et redirige vers la bonne route
  const logOut = () => {
    const getToken = async () => {
      const res = await Axios.get("http://localhost:3003/verifyUser", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      if (res.data.message === "guest") {
        navigate("/login");
      } else {
        navigate("/staffLogin");
      }
    };

    getToken();
  };

  return (
    <div className="sideMenu grid">
      <div className="logoDiv">
        <Link to={"/dashboard"}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <div className="menu ">
        <ul className="menuList grid">
          <li className="menuItem">
            <Link to={"/dashboard"} className="link">
              Accueil
            </Link>
          </li>
          <li className="menuItem">
            <Link to={"/sals"} className="link">
              Achats
            </Link>
          </li>
          <li className="menuItem">
            <Link to={"vehiclesPage"} className="link">
              Voitures
            </Link>
          </li>
          {/* */}
          <li className="menuItem">
            <Link to={"/employes"} className="link">
              Employés
            </Link>
          </li>
          <li className="menuItem">
            <Link to={"/settings"} className="link">
              Paramètres
            </Link>
          </li>

          <li className="menuItem logOutBtn" onClick={logOut}>
            <span>Déconnexion</span>
          </li>
        </ul>
      </div>
      <div className="bottomCard"></div>
    </div>
  );
};

export default SideMenu;
