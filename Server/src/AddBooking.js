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