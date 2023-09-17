import React from 'react'
import './Employe.css'

// Import images
import vehicleEmploye from  '../../../assets/mecanicien.png'
import vehiclePackage from '../../../assets/voitureLogo.png'
import car from  '../../../assets/garage.png'

const Employe = () => {
  return (
    <div className='employe container section'>
      <div className="secContainer">
        <span className="secTitle">
          Par ou commencer
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </span>

        <div className="grid steps">
            <div className="singleStep">
               <img src={vehiclePackage} alt="Image" />
               <div className="information">
                <span className="title">
                    Choisissez votre voiture !
                </span>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, modi.
                </p>
               </div>
            </div>

            <div className="singleStep">
               <img src={vehicleEmploye} alt="Image" />
               <div className="information">
                <span className="title">
                    Contactez notre équipe
                </span>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, modi.
                </p>
               </div>
            </div>

            <div className="singleStep">
               <img src={car}alt="Image" />
               <div className="information">
                <span className="title">
                    Veney au garage
                </span>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, modi.
                </p>
               </div>
            </div>
        </div>


      </div>
      
    </div>
  )
}

export default Employe