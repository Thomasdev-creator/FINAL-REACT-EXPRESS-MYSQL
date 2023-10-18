import React, {useEffect} from 'react'
import './Review.css'

// Import images
import user4 from '../../../assets/user (4).png'
import user5 from '../../../assets/user (5).png'
import user6 from '../../../assets/user (6).png'

const Review = () => {


  return (
    <div className='review section'>
      <div className="secContainer">
        <span className="secTitle">
          Avis clients
          <p>Les avis de nos clients</p>
        </span>

        <div className="reviewContainer container grid">

          <div data-aos='fade-up' data-aos-duration='3000' className="singleReview">
            <div className="imgDiv">
              <img src={user4}/>
            </div>

            <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel asperiores quod nostrum exercitationem laborum a!
            </p>

            <div className="name">
              Émilie
            </div>

          </div>

          <div data-aos='fade-up' data-aos-duration='3500' className="singleReview">
            <div className="imgDiv">
              <img src={user5}/>
            </div>

            <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel asperiores quod nostrum exercitationem laborum a!
            </p>

            <div className="name">
            Noémie
            </div>

          </div>

          <div data-aos='fade-up' data-aos-duration='4000' className="singleReview">
            <div className="imgDiv">
              <img src={user6}/>
            </div>

            <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel asperiores quod nostrum exercitationem laborum a!
            </p>

            <div className="name">
            Emma
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Review