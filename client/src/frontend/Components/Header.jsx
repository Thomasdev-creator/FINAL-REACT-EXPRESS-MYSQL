import React, { useState } from "react";
import "./Components.css";

import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

// Import Logo
import Logo from '../../assets/voiture-principale.png'

const Header = () => {
  const [active, setActive] = useState("navBar");
  const showNavBar = () => {
    setActive("navBar showNavbar");
  };
  const closeNavbar = () => {
    setActive("navBar");
  };

  return (
    <div className="header">
      <div className="logoDiv">
        <Link to={'/'}><img src={Logo} alt="Logo" /></Link>
      </div>

      <div className={active}>
        <ul className="navList">
          <li className="navItem">
            <Link to={"/"} className="navLink">
              Accueil
            </Link>
          </li>
          <li className="navItem">
            <Link to={"/about"} className="navLink">
              À propos
            </Link>
          </li>
          {/*  */}
        </ul>

        <AiFillCloseCircle className="icon closeIcon" onClick={closeNavbar} />
        <div className="headerBtns flex">
          <Link to={'/signup'} className="btn signInBtn">S'inscrire</Link>
          <Link to={'/login'} className="btn loginBtn">Connexion</Link>
          
        </div>
      </div>

      <GiHamburgerMenu className="toggleIcon icon" onClick={showNavBar} />
    </div>
  );
};

export default Header;
