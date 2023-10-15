const mongoose = require("mongoose");

const CustDetailsScehma = new mongoose.Schema({
        email: String,
        phone: String,
        pass: String,
        role: String,
    },
    { collection: "CustInfo", } );
mongoose.model("CustInfo", CustDetailsScehma);

//Samlpe Data
/*
const CustInfo = [{
    email : "muthubrijeshramasamy20@gmail.com",
    phone : "7502717171"
    pass : "Service@2023" // Data will convert into hashed value and stored in the Database
    role : "User"
}]
*/ 