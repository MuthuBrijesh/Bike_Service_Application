import React from 'react'
import './Home.css';
import BikeRepair from '../../Assets/bike.png';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const navigatelogin = () => {
    navigate(`../login`)
  }
  return (

    <div className='Home'>
      <div className='HomeDetails'>
        <div className='container'>
          <h1>Find Your Bike Service Expert</h1>
          <h3>Ride with Confidence</h3>
          <button onClick={navigatelogin}>Login Now</button>
        </div>
      </div>
      <div className='HomeImage'>
        <img src={BikeRepair} alt="alt repair"/>
      </div>
    </div>
  )
}

export default Home