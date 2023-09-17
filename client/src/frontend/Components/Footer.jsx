import React, {useEffect} from 'react'
import './Components.css'

//import des icônes
import {HiPhone} from 'react-icons/hi'
import {MdEmail} from 'react-icons/md'
import {FaFacebookF} from 'react-icons/fa'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillYoutube} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import {AiOutlineWhatsApp} from 'react-icons/ai'


const Footer = () => {

  return (
    <div className='footer'>

      <div className="secContainer container">
        <div className="content grid">

          <div data-aos='fade-up' data-aos-duration='2000' className="row">
            <div className="spanText">
              CONTACTEZ-NOUS
            </div>

            <div className="contactDiv">
              <span className="flex">
                <HiPhone className='icon'/>
                <span>+33 768977879</span>
              </span>
              <span className="flex">
                <MdEmail className='icon'/>
                <span>tom@exemple.com</span>
              </span>
              <span className="flex">
                <AiOutlineWhatsApp className='icon'/>
                <span>+33 668526612</span>
              </span>
            </div>
          </div>

          <div data-aos='fade-up' data-aos-duration='2000' className="row">
            <div className="spanText">
            ADRESSE
            </div>

            <div className="singleNews">
              <span className="text">
              3 rue exemple 
              </span>
              <p>
                Paris
              </p>
            </div>

            <div className="singleNews">
              <span className="text">
              10 rue exemple
              </span>
              <p>
                Nice
              </p>
            </div>
          </div>

          <div data-aos='fade-up' data-aos-duration='2000' className="row">
             <div className="spanText">
              HORAIRES
             </div>
             <div className="footerLinks">
              <ul>
                <li>Lundi : 9H-18H</li>
                <li>Mardi : 9H-18H</li>
                <li>Mercredi : 9H-18H</li>
                <li>Jeudi : 9H-18H</li>
                <li>Vendredi : 9H-18H</li>
                <li>Samedi et Dimanche fermé</li>
              </ul>
             </div>
          </div>

        </div>
        <div  className="bottomDiv flex">
          <p >Copyright 2023 Aston Martin - Touts droits reservé.</p>

          <div className="social flex">
            <FaFacebookF className='icon'/>
            <AiOutlineTwitter className='icon'/>
            <AiFillYoutube className='icon'/>
            <AiFillInstagram className='icon'/>
          </div>

          <a className='staffLogin' href="/staffLogin">Administrateur</a>
        </div>
      </div>
      
    </div>
  )
}

export default Footer