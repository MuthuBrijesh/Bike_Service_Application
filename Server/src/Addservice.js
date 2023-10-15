const mongoose = require("mongoose");

const AddServiceScehma = new mongoose.Schema({
        sname: String,
        sdesc: String,
        samount: String,
    },  { collection: "AddService", } );
mongoose.model("AddService", AddServiceScehma);

//Samlpe Data 
/*
const AddService = [{
    sname : "Oil Service",
    sdesc : "It Include Change in Oil and Oil Filter in your Bike"
    samount : "500" // Data will convert into hashed value and stored in the Database
}]
*/ 