const mongoose = require("mongoose");

const AdminDetailsScehma = new mongoose.Schema({
        email: String,
        phone: Number,
        noofbook:Number,
        pass: String,
        role: String,
    },
    { collection: "AdminInfo", } );
mongoose.model("AdminInfo", AdminDetailsScehma);

//Samlpe Data 
/*
const AdminInfo = [{
    email : "rideservice2023@gmail.com",
    phone : "7123789456"
    pass : "Service@2023" // Data will convert into hashed value and stored in the Database
    role : "Admin"
}]
*/ 