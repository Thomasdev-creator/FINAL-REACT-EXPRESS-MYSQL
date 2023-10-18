import React from 'react'
import './Employe.css'

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
               <div className="information">
                <span className="title">
                    Contactez notre équipe !
                </span>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, modi.
                </p>
               </div>
            </div>

            <div className="singleStep">
               <div className="information">
                <span className="title">
                    Garage
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