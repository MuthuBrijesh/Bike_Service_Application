import React from 'react';
import './EditService.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import service from '../../../Assets/5.png';


function EditService() {
  const [sname, setSName] = useState();
  const [sdesc, setSDesc] = useState();
  const [samount, setSAmount] = useState();
  const navigate = useNavigate()
  var [data, setData] = useState([]);

  const _id = sessionStorage.getItem("changeser");
  useEffect(() => {
    fetch("http://localhost:5000/fetchservice", {
      method: "POST", crossDomain: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  });

  const handleCancel = () => {
    sessionStorage.setItem("changeser", null);
    navigate(`../adminservice`)
  }

  const handleSubmit = () => {
    console.log(_id)
    if (sname !== undefined) {
      data.sname = sname
    }
    if (sdesc !== undefined) {
      data.sdesc = sdesc
    }
    if (samount !== undefined) {
      data.samount = samount
    }
    fetch("http://localhost:5000/updateservice", {
      method: "POST", crossDomain: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "UserRegister");
        if (data.status === "OK") {
          alert("Updated Succesfully");
          navigate(`../adminservice`)
        }
      });
  }
  return (
    <div className='editservice'>
      <form className='eservice'>
        <h1>Edit Service</h1>
        <label id='name'>Service Name</label>
        <TextField style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="name" multiline maxRows={2} defaultValue={data.sname} onChange={(e) => setSName(e.target.value)} />
        <label id='desc'>Service Description</label>
        <TextField style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="desce" multiline maxRows={6} defaultValue={data.sdesc} onChange={(e) => setSDesc(e.target.value)} />
        <label>Amount</label>
        <TextField type="text" style={{ marginBottom: 20, marginTop: 10 }} multiline maxRows={1} defaultValue={data.samount} onChange={(e) => setSAmount(e.target.value)} />
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

export default EditService