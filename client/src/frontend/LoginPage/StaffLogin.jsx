import React, { useEffect, useState } from "react";
import "../../index.css";
import "./Login.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const StaffLogin = () => {
  //Créer un state qui contient les valeurs entrées par l'utilisateur
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);

  const LoginUser = async (e) => {
    e.preventDefault();

    const response = await Axios.post(`${apiUrl}/auth/loginStaff/`, {
      userEmail: userEmail,
      password: userPassword,
    });

    if (response.data.auth == true) {
      setLoginStatus(true)
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }else{
      setLoginStatus(false)
      navigate("/staffLogin");
      alert('Email or Password entered are incorrect!')
    }
  };
  return (
    <>
      <Header />
      <div className="container formContainer">
        <div className="formCard">
          <h3>Staff Login Page</h3>
          <span>Welcome Admin</span>

          <form action="">
            <div className="inputDiv">
              <label htmlFor="userEmail">User Email</label>
              <input
                type="email"
                placeholder="Enter user email"
                autoComplete="email"
                onChange={(event) => {
                  setUserEmail(event.target.value);
                }}
              />
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="current-password"
                onChange={(event) => {
                  setUserPassword(event.target.value);
                }}
              />
            </div>

            <button onClick={LoginUser} className="btn">
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StaffLogin;
