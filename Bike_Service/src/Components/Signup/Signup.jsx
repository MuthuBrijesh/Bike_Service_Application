import { useState } from 'react';
import './Signup.css';
import validator from 'validator';
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [pass, setPass] = useState();
  const [cpass, setCPass] = useState();
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validator.isEmail(email) && email != null) {
      if (phone.length === 10) {
        if (pass === cpass && pass != null && cpass != null) {
          if (validator.isStrongPassword(pass, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            fetch("http://localhost:5000/signup", {
              method: "POST", crossDomain: true,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, phone, pass, }),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "UserRegister");
                if (data.status === "ok") {
                  alert("Register Succesfully");
                  navigate('../login');
                }
                else {
                  alert("User Email or Phone Number Already Exist");
                }
              });
          } else {
            alert('Is Not Strong Password')
            alert('Enter Valid Password format should be have atleast one lowercase, uppercase, number, symbol and length of this password shoul be 8')
          }
        } else {
          alert('Password Mismatch')
        }
      } else {
        alert("Enter Valid Phone Number")
      }
    } else {
      alert('Enter valid Email!')
    }
  }
  return (
    <div className='Signup'>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <input type="text" placeholder='Username' onChange={(e) => setEmail(e.target.value)} /><br></br>
        <input type="tel" placeholder='Phone' onChange={(e) => setPhone(e.target.value)} /><br></br>
        <input type="password" placeholder='Password' onChange={(e) => setPass(e.target.value)} /><br></br>
        <input type="password" placeholder='Confirm Password' onChange={(e) => setCPass(e.target.value)} /><br></br>
        <button>Submit</button><br></br>
      </form>
    </div>
  )
}

export default Signup;