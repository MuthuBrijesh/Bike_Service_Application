const mongoose = require("mongoose");

const CustDetailsScehma = new mongoose.Schema({
        email: String,
        phone: String,
        pass: String,
        role: String,
    },
    { collection: "CustInfo", } );
mongoose.model("CustInfo", CustDetailsScehma);