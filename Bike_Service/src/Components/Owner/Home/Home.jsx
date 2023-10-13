import React from 'react'
import './Home.css';
import BikeRepair from '../../../Assets/bike2.png';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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
        <button>View Booking</button>
      </div>
    </div>
  </div>
  )
}


export default Home