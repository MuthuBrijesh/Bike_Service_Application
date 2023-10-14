
# Bike Service Application

This is a full-stack web application built using the MERN stack for managing bike services. It provides a platform for users to schedule bike services, track maintenance and history, and receive email when bike is ready for delivery and admin can manage service (Create.Read,Update,Delete) and change status of booking and receive email for each booking.

## User Roles
There are two distinct user roles within the system:  
    1. Admin: The Admin role manages the overall system, including managing services and status of the booking and can view the customer booking  
    2. Customer: The Customer role can add new booking and view the status and history of the Booking.

## Features

### Bike station owner:
- Should be able to Create / Edit / Delete / All his services and their details
- View a list of all bookings of Pending / Ready / Completed / All for a delivery 
- View details of each booking
- Mark a booking as ready for delivery
- Mark a booking as completed
- Receive an email whenever a booking is made
- Update the Password by using OTP through Email
### Customers
- Should be able to register for an account with his email address and mobile number
- Book a service at a particular date
- See the status of his booking
- See all his previous bookings
- Receive an email as soon as his booking is ready for delivery
- Login / Signup User Account
- Login Owner Account 
- Update the Password by using OTP through Email

## Technologies
- Reactjs
- Nodejs
- Expressjs
- MongoDB Atlas
- MaterialUI

## Login

- Admin 
`username: rideservice2023@gmail.com or 7123789456`
- User can Create Account  

## Deployment

#### 1. Clone the Reposotiry
```bash
git clone https://github.com/MuthuBrijesh/Bike_Service_Application.git
```
#### 2. Go to the project directory and install dependencies for both the client and server
```bash
cd Bike_Service
npm install
```
```bash
cd Server
npm install
```
#### 3. Start the Server
```bash
cd Server
npm start
```
#### 4. Start the Bike_Service
```bash
cd Bike_Service
npm start
```
#### 5. Install the Express.js, Mongoose and Cors dependencies by running the following command
```bash
npm i express cors mongoose  
```
#### 6. Run the following command to automatically initialize a Server
Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
```bash
npm i nodemon
```
#### 7. Run the following command to install MaterialUI
```bash
npm i @mui/material @mui/styled-engine-sc styled-components
npm i @mui/icons-material
npm i @fontsource/roboto
npm i @mui/material @emotion/react @emotion/styled  
npm i @material-ui/core
```
#### 8. Run the following code to install validator 
A library of string validators.
```bash
npm i validator
```
#### 9. Run the following code to install bcrypt 
A library to help you hash passwords.
```bash
npm i bcrypt
```
#### 10. Run the following code to install react router  
```bash
npm i react-router-dom
```
