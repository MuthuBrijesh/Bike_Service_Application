import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { CgMenuGridR, CgClose } from 'react-icons/cg';
import { useNavigate } from "react-router-dom"


const Navbar = () => {

  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false);
  const role = sessionStorage.getItem("role");

  const logout = () =>{
    alert("Logout")
    navigate(`../`)
    sessionStorage.clear();
  }

  const Home = () =>{
    if(role==null){
      navigate(`../`)
    } else if(role==="user"){
      navigate(`../customerhome`)
    } else{
      navigate(`../adminhome`)
    }
  }

  return (
    <nav>
      <h3 onClick={Home} className="title">
        Ride
      </h3>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <p style={{ color: '#683B2B', fontSize: 40 }}>{menuOpen ? <CgClose /> : <CgMenuGridR />}</p>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        {
          role == null ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </>
          ) : (
            //User Navigation
            role === "user" ? (
              <>
                <li>
                  <NavLink to="/customerHome">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/customerbooking">Book</NavLink>
                </li>
                <li>
                  <NavLink to="/customerhistory">History</NavLink>
                </li>
                <li>
                  <NavLink to="/customerbooked">Status</NavLink>
                </li>
                <li>
                  <NavLink to="/" onClick={logout}>Logout</NavLink>
                </li>
              </>
            ) : (//Owner Navigation 
              <>
                <li>
                  <NavLink to="/adminhome">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/adminservice">Service</NavLink>
                </li>
                <li>
                  <NavLink to="/admincustbooking">CustBooking</NavLink>
                </li>
                <li>
                  <NavLink to="/"  onClick={logout}>Logout</NavLink>
                </li>
              </>
            )
          )
        }
      </ul>
    </nav>
  )
}

export default Navbar;