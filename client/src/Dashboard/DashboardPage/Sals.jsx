import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Axios from "axios";

// Import des icônes
import { TbListDetails } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const Sals = () => {
  const [sals, setSals] = useState([]);
  // const [carName, setCarName] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSals = async () => {
      try {
        const res = await Axios.get("http://localhost:3003/sale/allSals");
        setSals(res.data.sals);

        const getEmail = await Axios.get("http://localhost:3003/user/verifyUser", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      {sals.map(guestSal =>
        {
          const guestID = guestSal.id
          const guestRole = guestSal.role
          console.log(guestID)

          if( guestRole === getEmail.data.message){
            const getGuestSals = async()=>{
              try{
                  const getSals = await Axios.get("http://localhost:3003/sale/getGuestSals/" + guestID)
                  setSals(getSals.data.sals)
              }catch(err){
                console.log(err)
              }
            }
            getGuestSals()
          }
          else if(guestRole !== getEmail.data.message){
            setSals([]);
          }
          
          else{
            setSals((prev)=>({...prev}));
          }
        }

      )}

        

       

        const carNameID = res.data.sals[0].carID;
        const carID = await Axios.get(
          "http://localhost:3003/car/getCarName/" + carNameID
        );
        // const carName = carID.data.car[0].name;
      } catch (err) {
        console.log("Error occured");
      }
    };
    fetchSals();
  }, []);

  // check si l'utilisateur est autorisé à voir cette page

  return (
    <div className="OutletCSS">
      <div className="pageBody">
        <div className="sectionTitle">
          <h1>Véhicules acheté</h1>
          <p>
            Touts les véhicules acheté au cour de ce dernier mois.
          </p>
        </div>

        <div className="tableDiv">
          <table>
            <thead>
              <tr className="tableHeaders flex">
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Voiture</th>
                <th>Model</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {sals.map((sal) => (
                <tr className="tableRows flex" key={sal.id}>
                  <td>0{sal.id}</td>
                  <td>{sal.guestname}</td>
                  <td>{sal.email}</td>
                  <td>{sal.year}</td>
                  <td>{sal[1]}</td>
                  <td>{sal.carname}</td>

                  <td>
                    <Link to={`/salDetails/${sal.id}`}>
                      <TbListDetails className="icon" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sals;
