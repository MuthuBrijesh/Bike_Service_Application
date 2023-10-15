const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
app.use(cors());

//Sample Data is Added to the Schema Page

//Send In Blue Platform for Email
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = "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";
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//MongoDB URL
const mogoDburl = "mongodb+srv://rideservice2023:service2023@ride.qoibsj2.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

//Database Connection
mongoose.connect(mogoDburl, {
    useNewUrlParser: true,
}).then(() => {
    console.log("Connected to database");
}).catch((e) => console.log(e));

app.listen(5000, () => console.log('Server Started'));

//Importing Modules
require("./src/Customer");
const User = mongoose.model("CustInfo");
require("./src/Admin");
const Admin = mongoose.model("AdminInfo");
require("./src/Addservice");
const AService = mongoose.model("AddService");
require("./src/AddBooking");
const CBooking = mongoose.model("AddBooking");

//ADMIN SIDE Connectivity
//Add Service
app.post("/addservice", async (req, res) => {
    const { sname, sdesc, samount } = req.body;
    try {
        const check = await AService.findOne({ sname });
        if (check === null) {
            await AService.create({ sname, sdesc, samount, });
            res.send({ status: "ok" });
        } else {
            res.send({ status: "error1" });
        }
    } catch (error) {
        res.send({ send: "catch error" });
    }
});

//View All Service
app.post("/service", async (req, res) => {
    try {
        const data = await AService.find();
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Fetch A Service
app.post("/fetchservice", async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await AService.findOne({ _id: _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Update A Service
app.post("/updateservice", async (req, res) => {
    var { data } = req.body;
    try {
        data = await AService.updateOne({ _id: data._id }, { $set: { sname: data.sname, sdesc: data.sdesc, samount: data.samount } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Delete A Service
app.post("/deleteservice", async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await AService.deleteOne({ _id: _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Fetch All Booking
app.post("/custbooking", async (req, res) => {
    const { status } = req.body;
    try {
        if (status == null) {
            const data = await CBooking.find();
            res.send({ status: "OK", data: data });
        } else {
            const data = await CBooking.find({ status });
            res.send({ status: "OK", data: data });
        }

    } catch (error) {
        console.log(error);
    }
});

//Update Service
app.post("/updatebooking", async (req, res) => {
    const { _id, status } = req.body;
    try {
        var data = await CBooking.updateOne({ _id: _id }, { $set: { status: status } });
        data = await CBooking.findOne({ _id: _id });
        if (status === "Ready") {
            const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
            const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
            sendSmtpEmail.to = [{ "email": data.email }];
            sendSmtpEmail.templateId = 2;
            sendSmtpEmail.params = {
                "Date": data.date,
                "Name": data.name,
                "Make": data.vname,
                "Model": data.vmodel,
                "Number": data.vno,
                "Service": data.service,
            };
            apiInstance.sendTransacEmail(sendSmtpEmail).then(() => {
                console.log("Ready for Delivery email sent");
            }).catch((err) => {
                console.log(err);
            });
        }
        res.send({ status: "ok", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Update Number of Book per day
app.post("/updatenoofbook", async (req, res) => {
    var { noofbook } = req.body;
    try {
        const data = await Admin.updateOne({}, { $set: { noofbook: noofbook } });
        res.send({ status: "ok"});
    } catch (error) {
        console.log(error);
    }
});


//User Service
//User Login
app.post("/login", async (req, res) => {
    const { uname, password } = req.body;
    try {
        var user = "";
        if (uname === "rideservice2023@gmail.com" || uname === "7123789456") {
            user = await Admin.findOne({}, { pass: 1 });
        } else {
            user = await User.findOne({ $or: [{ email: uname }, { phone: uname }] });
        }
        if (user === "") {
            return res.json({ error: "User Not Found" });
        }
        const valid = await bcrypt.compare(password, user.pass)
        if (valid) {
            return res.json({ status: "ok", data: user });
        }
        res.json({ status: "error", error: "Invalid Password" })
    } catch (error) {
        console.log(error);
    }
})

//User Register
app.post("/signup", async (req, res) => {
    var { email, phone, pass } = req.body;
    pass = await bcrypt.hash(pass, 13);
    const role = "user";
    try {
        const check = await User.findOne(({ $or: [{ email }, { phone }] }));
        if (check === null) {
            await User.create({
                email,
                phone,
                pass,
                role,
            });
            res.send({ status: "ok" });
        } else {
            res.send({ status: "error" });
        }
    } catch (error) {
        res.send({ send: "catch error" });
    }
});

//ADD Booking and Send Email
app.post("/addbooking", async (req, res) => {
    const { date, name, email, phone, vname, vno, vmodel, address, service } = req.body;
    const status = "Pending"
    try {
        const check = await CBooking.findOne({ date: date, vno: vno })
        const check2 = await CBooking.findOne({ vno: vno, status: { $in: ["Pending", "Ready"] } })
        const count1 = await Admin.find({}, { noofbook: 1 })
        var count = await CBooking.find({ date: date }).count()
        count1 = count1[0].noofbook
        if (check === null) {
            if (check2 === null) {
                if (count <= count1) {
                    await CBooking.create({ date, name, email, phone, vname, vno, vmodel, address, status, service });
                    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
                    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
                    sendSmtpEmail.to = [{ "email": "rideservice2023@gmail.com" }];
                    sendSmtpEmail.templateId = 1;
                    sendSmtpEmail.params = {
                        "Date": date,
                        "Name": name,
                        "Email": email,
                        "Phone": phone,
                        "Make": vname,
                        "Model": vmodel,
                        "Number": vno,
                        "Address": address,
                        "Service": service,

                    };
                    apiInstance.sendTransacEmail(sendSmtpEmail).then(() => {
                        console.log("Booked email sent");
                    }).catch((err) => {
                        console.log(err);
                    });
                    res.send({ status: "ok" });
                } else {
                    res.send({ status: "Bookfilles" });
                }
            } else {
                res.send({ status: "NotCompleted" })
            }
        } else {
            res.send({ status: "exist" });
        }
    } catch (error) {
        console.log("Error")
        res.send({ send: "catch error" });
    }
});

//Fetch All Completed Booking
app.post("/history", async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: "Completed" });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Fetch All Booking without Status Completed
app.post("/fetchbook", async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: { $nin: ["Completed"] } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Details of  Booking
app.post("/viewbooking", async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await CBooking.findOne({ _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Admin and User Forgot Password
app.post("/forgotpasswordotp", async (req, res) => {
    var { email, otp } = req.body;
    try {
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ "email": email }];
        sendSmtpEmail.templateId = 3;
        sendSmtpEmail.params = {
            "Otp": otp
        };
        apiInstance.sendTransacEmail(sendSmtpEmail).then(() => {
            console.log("Password reset email sent");
        }).catch((err) => {
            console.log(err);
        });
        res.send({ status: "ok" });
    } catch (error) {
        console.log(error);
    }
});

//Update Password
app.post("/forgotpasswordupdate", async (req, res) => {
    var { email, pass } = req.body;
    pass = await bcrypt.hash(pass, 13);
    try {
        if (email === "rideservice2023@gmail.com" || email === "7123789456") {
            data = await Admin.updateOne({ email: email }, { $set: { pass: pass } });
        } else {
            data = await User.updateOne({ email: email }, { $set: { pass: pass } });
        }
        res.send({ status: "ok", data: data });
    } catch (error) {
        console.log(error);
    }
});