import React from "react";
import "./About.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <>
      <Header />
      <div className="aboutPage container">
        <span className="secTitle">
          Aston Martin
          <p>Apprenez-en plus sur nous !</p>
        </span>

        <div className="description grid">
          <div className="sigleGrid">
            <h2>Notre équipe</h2>
            <p>
              At Charly's Desert Vehicles, we take pride in our team of experienced
              professionals who are passionate about delivering exceptional
              desert car experiences. Our staff members are knowledgeable,
              friendly, and dedicated to ensuring your utmost satisfaction. From
              our skilled drivers to our expert employes, we are here to make your
              desert adventure truly memorable. Count on our staff to provide
              you with excellent service and personalized attention throughout
              your journey.
            </p>
          </div>

          <div className="sigleGrid">
            <h2>Notre histoire</h2>
            <p>
              At Charly's Desert Vehicles, we understand the value of your time and strive
              to make the most of every moment you spend with us. We
              meticulously plan and organize our desert cars to ensure a
              seamless and efficient experience. From timely pickups to
              well-structured itineraries, we aim to optimize your time and
              provide you with a hassle-free adventure. Trust us to manage your
              time effectively, allowing you to fully immerse yourself in the
              beauty and activities of the desert.
            </p>
          </div>

          <div className="sigleGrid">
            <h2>Nos voitures</h2>
            <p>
              At Charly's Desert Vehicles, we take pride in our team of experienced
              professionals who are passionate about delivering exceptional
              desert car experiences. Our staff members are knowledgeable,
              friendly, and dedicated to ensuring your utmost satisfaction. From
              our skilled drivers to our expert employes, we are here to make your
              desert adventure truly memorable. Count on our staff to provide
              you with excellent service and personalized attention throughout
              your journey.
            </p>
          </div>
          <div className="sigleGrid">
            <h2>Venez-nous rencontrez</h2>
            <p>
              Your comfort and safety are our top priorities at Charly's Desert Vehicles.
              We have carefully selected a fleet of well-maintained 4x4 vehicles
              equipped with state-of-the-art safety features. Our skilled
              drivers are adept at navigating the challenging desert terrain,
              ensuring a smooth and secure ride. Sit back, relax, and enjoy the
              journey as we transport you to the mesmerizing landscapes and
              thrilling activities of the desert.
            </p>
          </div>

          <div className="sigleGrid">
            <h2>Nos équipements</h2>
            <p>
              At Charly's Desert Vehicles, we are committed to providing you with a desert
              car experience that is not only exciting but also safe. We
              adhere to stringent health and safety protocols to ensure your
              well-being throughout your journey. Our vehicles undergo regular
              maintenance, and our activities are conducted with a focus on
              minimizing risks. Rest assured that we prioritize your safety at
              every step, allowing you to fully enjoy your desert adventure with
              peace of mind.
            </p>
          </div>

          <div className="sigleGrid">
            <h2>Aston Martin en compétition</h2>
            <p>
              Clear and effective communication is the cornerstone of our
              service at Charly's Desert Vehicles. We understand the importance of being
              available to address your queries, provide assistance, and ensure
              a seamless experience. Our dedicated customer support team is
              always ready to answer your questions, offer guidance, and
              accommodate any special requests you may have. Count on us to be
              responsive, reliable, and committed to your satisfaction.
            </p>
          </div>
        </div>

        <div className="reviewSection section">
        <span className="secTitle">
          Laissez-nous un message
          <p>Nous serions ravis d'entendre votre avis !</p>
        </span>

        <div className="formDiv">
           <div className="inputDiv">
            <label htmlFor="name">Nom et prénom</label>
            <input type="text" placeholder="Entrez votre nom et prénom" />
           </div>
           {/* */}
           <div className="inputDiv">
            <label htmlFor="name">Message</label>
            <textarea name="" id="" placeholder="Écrivez votre message ici"></textarea>
           </div>
           <button className="btn">
            Envoyez message
           </button>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
