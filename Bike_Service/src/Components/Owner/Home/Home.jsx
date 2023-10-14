import React from 'react'
import './Home.css';
import BikeRepair from '../../../Assets/bike2.png';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const navigatebooking = () =>{
    navigate("../admincustbooking")
  }

  return (
    <div className='AdminHome'>
      <div className="background-video">
      </div>
    <div className='AdminHomeImage'>
      <img src={BikeRepair} alt="Bike"/>
    </div>
    <div className='AdminHomeDetails'>
    <div className='container'>
        <h1>Ride Bike Services</h1>
        <h3>Work with Confidence</h3>
        <button onClick={navigatebooking}>View Booking</button>
      </div>
    </div>
  </div>
  )
}


export default Home