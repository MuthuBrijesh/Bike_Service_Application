import React from 'react'
import './Home.css';
import BikeRepair from '../../../Assets/bike.png';
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate()

  
  const navigatebook = () => {
    navigate(`../customerbooking`)
  }
  return (

    <div className='CustHome'>
      <div className='CustHomeDetails'>
      <div className='container'>
          <h1>Find Your Bike Service Expert</h1>
          <h3>Ride with Confidence</h3>
          <button onClick={navigatebook}>Book Now</button>
        </div>
      </div>
      <div className='CustHomeImage'>
        <img src={BikeRepair} alt="alt repair"/>
      </div>
    </div>
  )
}

export default Home