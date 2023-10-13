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
    if ((uname === "rideservice2023@gmail.com" || uname === "1230789456") && password === "Service@2023") {
      alert("Signed Admin")
      navigate(`../adminhome`)
      sessionStorage.setItem("role", "admin");
    } else {
      fetch("http://localhost:5000/login", {
        method: "POST", crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname, password }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result, "userRegister");
          if (result.status === "ok") {
            sessionStorage.setItem("Email",result.data.email)
            sessionStorage.setItem("Phone",result.data.phone)
            alert("Customer Login");
            navigate(`../customerhome`)
            sessionStorage.setItem("role", "user");
          }
          else {
            alert("Invalid Credentials");
          }
        });
    }
  }

  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <input type="text" placeholder='Username' onChange={(e) => setUserName(e.target.value)} /><br></br>
        <input type="password" placeholder='Password' onChange={(e) => setPass(e.target.value)} /><br></br>
        <button>Submit</button><br></br>
        <button>Forgot Password</button>
      </form>
    </div>
  )
}

export default Login