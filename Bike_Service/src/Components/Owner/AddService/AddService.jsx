import React from 'react'
import './AddService.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import service from '../../../Assets/5.png';


function AddService() {
  const [sname, setSName] = useState();
  const [sdesc, setSDesc] = useState();
  const [samount, setSAmount] = useState();
  const navigate = useNavigate()

  const handleCancel = () => {
    navigate(`../adminservice`)
  }

  //Validation
  const alpha = /^[A-Za-z ]+$/; //Only Alpha
  const alphanumeric = /^[0-9a-zA-Z ]+$/; //Validate Alpha Numeric

  const handleSubmit = () => {
    if (sname != null && alpha.test(sname)) {
      if (sdesc != null) {
        if (samount != null && samount > 0 && alphanumeric.test(samount)) {
          try {
            fetch("http://localhost:5000/addservice", {
              method: "POST", crossDomain: true,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sname, sdesc, samount }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "ok") {
                  alert("Added Succesfully");
                  navigate(`../adminservice`)
                }
                else {
                  alert("Service Already Exist");
                }
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("Invalid Service Amount")
        }
      } else {
        alert("Invalid Service Description")
      }
    } else {
      alert("Invalid Service Name")
    }
  }
  return (
    <div className='addservice'>
      <form className='aservice'>
        <h1>Add Service</h1>
        <label id='name'>Service Name</label>
        <TextField style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="name" multiline maxRows={2} onChange={(e) => setSName(e.target.value)} />
        <label id='desc'>Service Description</label>
        <TextField style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="desce" multiline maxRows={6} onChange={(e) => setSDesc(e.target.value)} />
        <label>Amount</label>
        <TextField style={{ marginBottom: 20, marginTop: 10 }} multiline maxRows={1} onChange={(e) => setSAmount(e.target.value)} />
        <div className='actions'>
          <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={handleSubmit}>Confirm</Button><br></br>
          <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
      <div>
        <img src={service} alt="service" />
      </div>
    </div>
  )
}

export default AddService