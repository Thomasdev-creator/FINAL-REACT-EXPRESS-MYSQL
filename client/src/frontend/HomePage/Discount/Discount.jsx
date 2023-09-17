import React, {useEffect} from 'react'
import './Discount.css'

//Import video
import video from '../../../assets/pexels-video.mp4'


const Discount = () => {

  return (
    <div className='discount'>
      <div className="secContainer">
          <video src={video} autoPlay loop muted typeof='mp4'></video>
          <div className="textDiv">
            <span data-aos='fade-up' data-aos-duration='2000' className="title">
            Insrivez-vous à la newsletter !
            </span>
            <p data-aos='fade-up' data-aos-duration='2500'>
            Obtenez des infos et des offres de réduction sur tout nos véhicules.
            </p>

            <div data-aos='fade-up' data-aos-duration='3000' className="input_btn flex">
              <input type="text" placeholder='Entrez votre email' />
              <button className='btn'>S'inscrire</button>
            </div>
          </div>
      </div>

    </div>
  )
}

export default Discount