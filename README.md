
# Bike Service Application

This is a full-stack web application built using the MERN stack for managing bike services. It provides a platform for users to schedule bike services, track maintenance and history, and receive email when bike is ready for delivery and admin can manage service (Create.Read,Update,Delete) and change status of booking and receive email for each booking.

## User Roles
There are two distinct user roles within the system:  
    1. Admin: The Admin role manages the overall system, including managing services and status of the booking and can view the customer booking  
    2. Customer: The Customer role can add new booking and view the status and history of the Booking.

## Features
- Responsiveness
- Security
- Authentication
  
### Bike station owner:
- Should be able to Create / Edit / Delete / All his services and their details
- View a list of all bookings of Pending / Ready / Completed / All for a delivery 
- View details of each booking
- Mark a booking as ready for delivery
- Mark a booking as completed
- Receive an email whenever a booking is made
- Login Owner Account 
- Update the Password by using OTP through Email

### Customers
- Should be able to register for an account with his email address and mobile number
- Book a service at a particular date
- See the status of his booking
- See all his previous bookings
- Receive an email as soon as his booking is ready for delivery
- Login / Signup User Account
- Update the Password by using OTP through Email

## Technologies
- Reactjs
- Nodejs
- Expressjs
- MongoDB Atlas
- MaterialUI
- SendinBlue (Email)

## Login

- Admin 
`username: rideservice2023@gmail.com or 7123789456`
- User can Create Account  

## Deployment

#### 1. Clone the Repository
Clone the Repository by using this github link 
```bash
https://github.com/MuthuBrijesh/Bike_Service_Application.git
```

#### 2. Go to the project directory and install dependencies for both the client and server
```bash
cd Bike_Service
npm int
```
```bash
cd Server
npm init
```

#### 3. Install the Dependencies of Server

Dependencies info :
 - Express : Create an API very easily for the server
 - Mongoose : Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js.
 - Cors : CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
 - Nodemon : Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
 - Bcrypt : A library to help you hash passwords.
 - SendinBlue : SendinBlue's API exposes the entire SendinBlue features via a standardized programmatic interface

```bash
npm i express cors mongoose nodemon bcrypt sib-api-v3-sdk
```
#### 4. Install the Dependencies of Bike_service
 - MaterialUI : Material UI is an open-source React component library that implements Google's Material Design
 - Validator : This library validates and sanitizes strings only.
 - React Icons : Which provides a collection of popular icon libraries (such as Font Awesome, Material Design, and Octicons) that can be easily used in a React application.
 - React Router Dom : The react-router-dom package contains bindings for using React Router in web applications.
```bash
npm i react-router-dom validator react-icons
npm i @mui/material @mui/styled-engine-sc styled-components
npm i @mui/icons-material
npm i @fontsource/roboto
npm i @material-ui/core
npm i @mui/material @emotion/react @emotion/styledreact-icons
```
#### 5. Start the both, Server and Bike_Service
To start the project, the below code should be run in both, Server and Bike_Service directory.
```bash
npm start
```

## Some of Screenshots

![home](https://github.com/MuthuBrijesh/Bike_Service_Application/assets/81966663/dafc4e21-1451-439c-8558-54eff5bc7961)

![login](https://github.com/MuthuBrijesh/Bike_Service_Application/assets/81966663/0856fe1d-e8b9-4a69-b97a-7f53c35138aa)

![book](https://github.com/MuthuBrijesh/Bike_Service_Application/assets/81966663/2981e36e-d869-44dc-ba50-82e28fc67abe)

![history](https://github.com/MuthuBrijesh/Bike_Service_Application/assets/81966663/640a0b50-6955-4a3a-9ee4-ad24a010f553)

![service](https://github.com/MuthuBrijesh/Bike_Service_Application/assets/81966663/7f8ea71c-b2e2-408c-9acd-13f7bc26997e)
