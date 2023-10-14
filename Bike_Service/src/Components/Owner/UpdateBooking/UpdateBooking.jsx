import React from 'react';
import './UpdateBooking.css';
import { useState, useEffect } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css'
import Book from '../../../Assets/5.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function UpdateBooking() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const _id = sessionStorage.getItem("UpdateBookingID")

    //Fetching Booking Details
    useEffect(() => {
        fetch("http://localhost:5000/viewbooking", {
            method: "POST", crossDomain: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id }),
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            });
    });
    var status="Ready";

    //Cancel the Form
    const handleBack = () => {
        navigate("../admincustbooking")
    }

    const handleUpdate = () => {
        console.log("Updating")
        if (data.status === "Completed") {
            alert("Already the Service is Completed")
        }
        else {
            if (data.status === "Ready") {
                status="Completed"
                console.log(status)
            }
            fetch("http://localhost:5000/updatebooking", {
                method: "POST", crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id, status }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "ok") {
                        alert("Updated Succesfully")
                    }
                });
        }
        navigate("../admincustbooking")
    }

    //Styling Textfield
    const st = {
        marginBottom: 20,
        marginTop: 10,
        width: 300,
        border: '1px solid Black',
        borderRadius: 5,
        fontSize: 20,
    }

    return (
        <>
            <div className='vbooking'>
                <h1>Booking</h1>
            </div>
            <div className='updatebooking'>
                <form>
                    <div className='box' style={{ marginTop: 40 }}>
                        <div className='box-row'>
                            <div className='box-col'>
                                <label id='date'>Date</label>
                                <TextField style={st} id="date" value={data.date} />
                            </div>
                            <div className='box-col'>
                                <label id='name'>Name</label>
                                <TextField style={st} id="name" value={data.name} />
                            </div>
                        </div>
                        <div className='box-row'>
                            <div className='box-col'>
                                <label id='email'>Email</label>
                                <TextField style={st} id="email" value={data.email} />
                            </div>
                            <div className='box-col'>
                                <label id='phone'>Phone</label>
                                <TextField style={st} id="phone" value={data.phone} />
                            </div>
                        </div>
                        <div className='box-row'>
                            <div className='box-col'>
                                <label id='vname'>Vehicle Name</label>
                                <TextField style={st} id="vname" value={data.vname} />
                            </div>
                            <div className='box-col'>
                                <label id='vmodel'>Vehicle Model</label>
                                <TextField style={st} id="vmodel" value={data.vmodel} />
                            </div>
                        </div>
                        <div className='box-row'>
                            <div className='box-col'>
                                <label id='vno'>Vehicle Number</label>
                                <TextField style={st} id="vno" value={data.vno} />
                            </div>
                            <div className='box-col'>
                                <label id='addr'>Address</label>
                                <TextField style={st} id="addr" value={data.address} />
                            </div>
                        </div>
                        <div className='box-row'>
                            <div className='box-col'>
                                <label id='status'>Status</label>
                                <TextField style={st} id="status" value={data.status} />
                            </div>
                            <div className='box-col'>
                                <label id='service'>Service</label>
                                <TextField style={st} id="service" value={data.service} />
                            </div>
                        </div>
                    </div>
                    <div className='actions'>
                        <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={handleBack}>Back</Button>
                        <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={handleUpdate}>Update Service</Button>
                    </div>
                </form>
                <div className='book'>
                    <img src={Book} alt="book" />
                </div>
            </div>
        </>
    )
}

export default UpdateBooking;