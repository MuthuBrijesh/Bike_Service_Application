import React from 'react'
import './History.css'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const email = sessionStorage.getItem("Email")
    try {
      fetch("http://localhost:5000/history", {
        method: "POST", crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).then((res) => res.json())
        .then((data) => {
          setData(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className='custhistory'>
      <h1>History</h1>
      <div className='box'>
        <TableContainer component={Paper} >
          <Table sx={{ Width: '100%', backgroundColor: '#DED1BD' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >Date</TableCell>
                <TableCell >Name</TableCell>
                <TableCell >Bike Number</TableCell>
                <TableCell >Service</TableCell>
                <TableCell >Status</TableCell>
                <TableCell >Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                  <TableCell scope="row">{row.date}</TableCell>
                  <TableCell >{row.name}</TableCell>
                  <TableCell >{row.vno}</TableCell>
                  <TableCell >{row.service + ""}</TableCell>
                  <TableCell >{row.status}</TableCell>
                  <TableCell><Button variant="contained" >View</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default History