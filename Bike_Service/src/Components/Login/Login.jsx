import React from 'react';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate()
  const [uname, setUserName] = useState();
  const [password, setPass] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:5000/login", {
        method: "POST", crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname, password }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.status === "ok") {
            if ((uname === "rideservice2023@gmail.com" || uname === "7123789456") && password === "Service@2023") {
              navigate(`../adminhome`)
              sessionStorage.setItem("role", "admin");
            } else {
              sessionStorage.setItem("Email", result.data.email)
              sessionStorage.setItem("Phone", result.data.phone)
              alert("Customer Login");
              navigate(`../customerhome`)
              sessionStorage.setItem("role", "user");
            }
          }
          else {
            alert("Invalid Credentials");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    alert("ForgotPassword")
    navigate('../forgotpassword')
  }

  return (
    <div className='Login'>
      <form>
        <h2>Log in</h2>
        <input type="text" placeholder='Username' onChange={(e) => setUserName(e.target.value)} /><br></br>
        <input type="password" placeholder='Password' onChange={(e) => setPass(e.target.value)} /><br></br>
        <button onClick={handleSubmit}>Submit</button><br></br>
        <button onClick={handleCancel} >Forgot Password</button>
      </form>
    </div>
  )
}

export default Login