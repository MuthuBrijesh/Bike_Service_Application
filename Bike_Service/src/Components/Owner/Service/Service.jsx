import React from 'react'
import './Service.css'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

function Service() {

    const navigate = useNavigate()

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/service", {
            method: "POST", crossDomain: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
            });
    });

    const updateservice = (_id) => {
        sessionStorage.setItem("changeser", _id);
        navigate(`../editservice`)
    }

    const AddServ = () =>{sessionStorage.setItem("changeser", null);}

    const deleteservice = (_id) => {
        fetch("http://localhost:5000/deleteservice", {
            method: "POST", crossDomain: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "UserRegister");
                if (data.status === "ok") {
                    alert("Deleted Succesfully");
                    navigate(`../service`)
                }
            });
    }

    return (
        <div className='custservice'>
            <h1>List of Services</h1>
            <div className='header'>
                <Button variant="contained" style={{ backgroundColor: 'green', height: 45, textDecoration: 'none' }}><Link to='../addservice' onClick={AddServ} className='linkadd'>Add New Service</Link></Button>
            </div>
            <div className='box'>
                <TableContainer component={Paper} >
                    <Table sx={{ Width: '100%', backgroundColor: '#DED1BD' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: 150 }}>Service Name</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell style={{ width: 100 }} align="center">Amount</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.sname}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell scope="row">{row.sname}</TableCell>
                                    <TableCell align="center">{row.sdesc}</TableCell>
                                    <TableCell align="center">{row.samount}</TableCell>
                                    <TableCell align="center"><Button variant="contained" onClick={() => { updateservice(row._id) }} style={{ width: 100 }}>Edit</Button></TableCell>
                                    <TableCell align="center"><Button variant="contained" onClick={() => { deleteservice(row._id) }} style={{ backgroundColor: 'red', width: 100 }}>Delete</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Service