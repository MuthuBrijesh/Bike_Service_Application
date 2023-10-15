const mongoose = require("mongoose");

const AddBookingScehma = new mongoose.Schema({
        date: String,
        name: String,
        email: String,
        phone: String,
        vname: String,
        vno: String,
        vmodel: String,
        address: String,
        status: String,
        service: [String],
    },  { collection: "AddBooking", } );
mongoose.model("AddBooking", AddBookingScehma);


//Samlpe Data 
/*
const AddService = [{
    date : "Oil Service",
    name : "7123789456"
    email : "muthubrijeshramasamy20@gmail.com",
    phone : "7502717171",
    vname : "Royal Enfield",
    vno : "TN87N2023",
    vmodel : "Classic 350",
    address : "Rajapalayam",
    status : "Ready", //Three Type of Status Ready, Pending and Completed
    service : ["General Check Up","Oil Change"]
}]
*/ 