const mongoose = require("mongoose");

const AddServiceScehma = new mongoose.Schema({
        sname: String,
        sdesc: String,
        samount: String,
    },  { collection: "AddService", } );
mongoose.model("AddService", AddServiceScehma);