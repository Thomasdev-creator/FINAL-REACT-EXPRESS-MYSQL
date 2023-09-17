import React, {useEffect} from 'react'
import './Home.css'

const Home = () => {

  return (
    <div className='home'>

      <div className="homeText">
        <span data-aos='fade-up' data-aos-duration='2000' className='spanText'>
          VOITURES DE SPORTS
        </span>

        <div data-aos='fade-up' data-aos-duration='4000' className="homeTitle">
          <strong>Aston Martin</strong>
        </div>

        <div data-aos='fade-up' data-aos-duration='6000' className="btn">Contact</div>
      </div>
      

    </div>
  )
}

export default Home