import './App.css';
import {Routes, Route} from 'react-router-dom';
import AddService from './Components/Owner/AddService/AddService';
import Navbar from './Components/Navbar/Navbar';
import AdminService from './Components/Owner/Service/Service';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import AdminHome from './Components/Owner/Home/Home';
import CustomerHome from './Components/Customer/Home/Home';
import CustomerHistory from './Components/Customer/History/History';
import CustomerBooking from './Components/Customer/Booking/Booking';
import CustomerBook from './Components/Customer/Booked/Booked';
import ViewBooking from './Components/Customer/ViewBooking/ViewBooking';
import CustBooking from './Components/Owner/CustBooking/CustBooking'; //Admin
import UpdateBooking  from './Components/Owner/UpdateBooking/UpdateBooking'; //Admin
import EditService from './Components/Owner/EditService/EditService';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='App_main_pagecontent'>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/addservice" element={<AddService />}></Route>
            <Route path="/adminservice" element={<AdminService />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/adminhome" element={<AdminHome />}></Route>
            <Route path="/customerhome" element={<CustomerHome />}></Route>
            <Route path="/customerhistory" element={<CustomerHistory />}></Route>
            <Route path="/customerbooking" element={<CustomerBooking />}></Route>
            <Route path="/customerbooked" element={<CustomerBook />}></Route>
            <Route path="/viewbooking" element={<ViewBooking />}></Route>
            <Route path="/admincustbooking" element={<CustBooking />}></Route>
            <Route path="/updatebooking" element={<UpdateBooking />}></Route>
            <Route path="/editservice" element={<EditService />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          </Routes>
      </div>
    </div>
  );
}
export default App;
