import React from 'react';
import './ForgotPassword.css';
import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCPass] = useState("");
    const [state, setState] = useState(false);
    const [setotp, setOTP] = useState();
    const [setuotp, setUOTP] = useState();
    const navigate = useNavigate()

    let otp = '';
    var digits = '0123456789';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    const OTPUpdate = (e) => {
        e.preventDefault();
        if (state === false) {
            otp = otp.toString();
            setUOTP(otp)
            if (validator.isEmail(email) && email !== "") {
                if (pass === cpass && pass !== "" && cpass !== "") {
                    if (validator.isStrongPassword(pass, {
                        minLength: 8, minLowercase: 1,
                        minUppercase: 1, minNumbers: 1, minSymbols: 1
                    })) {
                        try {
                            fetch("http://localhost:5000/forgotpasswordotp", {
                                method: "POST", crossDomain: true,
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ email, otp }),
                            })
                                .then((res) => res.json())
                                .then((result) => {
                                    if (result.status === "ok") {
                                        alert("OTP Sent");
                                        if (state === false) {
                                            setState(!state);
                                        }
                                    } else {
                                        alert("No Such Email Exist")
                                    }
                                });
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        alert("Weak Password")
                        alert("Enter Valid Password format should be have atleast one lowercase, uppercase, number, symbol and length of this password shoul be 8")
                    }
                } else {
                    alert("Invalid Password")
                }
            } else {
                alert("Invalid Email")
            }
        } else {
            alert("Hello")
        }
    }

    const otpupdate = () => {
        if (setuotp === setotp) {
            try {
                fetch("http://localhost:5000/forgotpasswordupdate", {
                    method: "POST", crossDomain: true,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, pass }),
                })
                    .then((res) => res.json())
                    .then((result) => {
                        if (result.status === "ok") {
                            alert("Updated Succesfully!!");
                            navigate(`../login`)
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            alert(setuotp)
        }
    }

    return (
        <div className='ForgotPassword'>
            <form onSubmit={OTPUpdate}>
                <h2>Forgot Password</h2>
                <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} /><br></br>
                <input type="password" placeholder='Password' onChange={(e) => setPass(e.target.value)} /><br></br>
                <input type="password" placeholder='Confirm Password' onChange={(e) => setCPass(e.target.value)} /><br></br>
                <button >Submit</button><br></br>
            </form>
            <div className='otp'>
                {
                    state ? <>
                        <input type="number" placeholder='OTP' onChange={(e) => setOTP(e.target.value)} /><br></br>
                        <button onClick={otpupdate}>Change</button><br></br>
                    </> : <></>
                }
            </div>
        </div>
    )
}

export default ForgotPassword