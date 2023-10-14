import React from 'react'
import './Booking.css';
import { useState, useEffect } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css'
import Book from '../../../Assets/5.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

function Booking() {
    //Use State
    const [name, setOName] = useState("");
    const [vname, setVName] = useState("");
    const [vno, setVNo] = useState("");
    const [vmodel, setVModel] = useState("");
    const [address, setVAddress] = useState("");
    const [date, setDate] = useState("");
    const [service, setService] = React.useState([]);
    const [data, setData] = useState([]);

    //Navigation
    const navigate = useNavigate()

    //Change Date Format
    const currDate = new Date().toLocaleDateString();
    var curr = currDate.split("/");
    if (curr[0] < 9) {
        curr[0] = '0' + curr[0];
    }
    curr[3] = (parseInt(curr[2]) + 1).toString();
    const sdate = curr[2] + '-' + curr[0] + '-' + curr[1]; //Current Date
    const edate = curr[3] + '-' + curr[0] + '-' + curr[1]; //A Year Gap Between Current Date

    //Validation
    const alpha = /^[A-Za-z ]+$/; //Only Alpha
    const VNO = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/; //Vehicle Number Validation
    const alphanumeric = /^[0-9a-zA-Z ]+$/; //Validate Alpha Numeric

    //Services
    useEffect(() => {
        try {
            fetch("http://localhost:5000/service", {
                method: "POST", crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(),
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                });
        } catch (error) {
            console.log(error);
        }
    });

    const handleChange = (event) => {
        const { target: { value } } = event;
        setService(typeof value === 'string' ? value.split(',') : value);
    };
    //Submiting Form
    const handleSubmit = () => {
        const email = sessionStorage.getItem("Email")
        const phone = sessionStorage.getItem("Phone")
        if (date !== "") {
            if (name !== "" && alpha.test(name)) {
                if (vname !== "" && alpha.test(vname)) {
                    if (vno !== "" && VNO.test(vno)) {
                        if (vmodel !== "" && alphanumeric.test(vmodel)) {
                            if (address !== "") {
                                if (service.length > 0) {
                                    fetch("http://localhost:5000/addbooking", {
                                        method: "POST", crossDomain: true,
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ date, name, email, phone, vname, vno, vmodel, address, service }),
                                    })
                                        .then((res) => res.json())
                                        .then((data) => {
                                            if (data.status === "ok") {
                                                alert("Added Succesfully");
                                                navigate(`../customerhome`)
                                            } else if (data.status === "Bookfilles") {
                                                alert("Today's Booking is Filled");
                                            }
                                            else if (data.status === "NotCompleted") {
                                                alert("The Bike is Not Completed")
                                            }
                                            else {
                                                alert("Booking Already Register in Same Date");
                                            }
                                        });
                                } else {
                                    alert("Pick any one Service")
                                }
                            } else {
                                alert("Invalid the Address")
                            }
                        } else {
                            alert("Invalid the Vehicle Model")
                        }
                    } else {
                        alert("Invalid the Vehicle Number")
                    }
                } else {
                    alert("Invalid the Vehicle Name")
                }
            } else {
                alert("Invalid the Name")
            }
        } else {
            alert("Pick a Date")
        }
    }

    //Cancel the Form
    const handleCancel = () => {
        navigate("../customerhome")
    }

    return (
        <div className='cbooking'>
            <form>
                <h1>Book a Service</h1>
                <div className='box' style={{ marginTop: 40 }}>
                    <label>Date</label>
                    <input type="date" className='date' min={sdate} max={edate} style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="date" onChange={(e) => setDate(e.target.value)} />
                    <label id='name'>Owner Name</label>
                    <TextField style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="name" onChange={(e) => setOName(e.target.value)} />
                    <label id='vname'>Vehicle Name</label>
                    <TextField style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="vname" onChange={(e) => setVName(e.target.value)} />
                    <label id='vno'>Vehicle Number</label>
                    <TextField style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="vno" onChange={(e) => setVNo(e.target.value)} />
                    <label id='vmodel'>Vehicle Model</label>
                    <TextField style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="vmodel" onChange={(e) => setVModel(e.target.value)} />
                    <label id='adrr'>Address</label>
                    <TextField style={{ marginBottom: 20, marginTop: 10 }} fullWidth id="addr" onChange={(e) => setVAddress(e.target.value)} />
                    <label id='service'>Service</label>
                    <div>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={service}
                            onChange={handleChange}
                            style={{ width: '100%' }}  >
                            {data.map((i) => (
                                <MenuItem
                                    key={i.sname}
                                    value={i.sname}>   {i.sname} </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className='actions'>
                        <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={handleSubmit}>Confirm</Button><br></br>
                        <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>
            </form>
            <div className='book'>
                <img src={Book} alt="book" />
            </div>
        </div>
    )
}

export default Booking;