import React, {useEffect} from 'react'
import './Review.css'

// Import images
import user1 from '../../../assets/user (1).jpg'
import user2 from '../../../assets/user (2).png'
import user3 from '../../../assets/user (3).png'

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
              <img src={user1}/>
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
              <img src={user2}/>
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
              <img src={user3}/>
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