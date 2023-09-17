import React from 'react'
import Home from './Home/Home'
import Vehicle from './Vehicles/Vehicle'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Employe from './Employe/Employe'
import Discount from './Discount/Discount'
import Review from './Review/Review'


const HomePage = () => {
  return (
    <div>
      <Header/>
      <Home/>
      <Employe/>
      <Vehicle/>
      <Discount/>
      <Review/> 
      <Footer/>
    </div>
  )
}

export default HomePage