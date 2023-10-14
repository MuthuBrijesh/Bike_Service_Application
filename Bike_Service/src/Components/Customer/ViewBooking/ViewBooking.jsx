import React from 'react';
import './ViewBooking.css';
import { useState, useEffect } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css'
import Book from '../../../Assets/5.png';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function ViewBooking() {

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const _id = sessionStorage.getItem("BookingID")
    //Fetching Booking Details
    useEffect(() => {
        try {
            fetch("http://localhost:5000/viewbooking", {
                method: "POST", crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                });
        } catch (error) {
            console.log(error);
        }
    });

    //Cancel the Form
    const handleConfirm = () => {
        navigate("../customerhome")
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
                <h1>Booking Details</h1>
            </div>
            <div className='viewbooking'>
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
                        <Button variant="contained" style={{ backgroundColor: 'green' }} onClick={handleConfirm}>Back</Button><br></br>
                    </div>
                </form>
                <div className='book'>
                    <img src={Book} alt="book" />
                </div>
            </div>
        </>
    )
}
export default ViewBooking