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