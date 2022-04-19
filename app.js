const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


const app = express();

dotenv.config({path:"./config.env" })
require('./db/conn')

// const User = require('./model/userSchema')

app.use(express.json())

app.use(cookieParser()) // this is used to parse the cookies


// we link the router files to make our route easy
app.use(require('./routers/auth'))



const PORT = process.env.PORT || 5000;




// Middleware
// Middleware functions are functions that have access to 
// the request object (req),
// the response object (req),
// next function in the application's request-response cycle.

// The next function is a function in the Express router which,
// when invoked, executes the middleware succeeding the current
// middleware.


// const middleware = (req,res,next) => {
//     console.log("This is Middle ware");
//     next();
// }


// app.get('/', (req,res)=> {
//     res.send(`Hello worldjlkjl`)
// })

// app.get('/about',middleware, (req,res)=> {

//     res.send(`About`)
// })

// app.get('/contact', (req,res)=> { 
//     res.send(`Contact`)
// })

// app.get('/signin', (req,res)=> { 
//     res.send(`Log In User`)
// })
// app.get('/signup', (req,res)=> { 
//     res.send(`Register User`)
// })

// const path = require("path");
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));

// setp keroku
//we  basically need to host build and serve file
// step 3: Heroku

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}



app.listen(PORT,()=>{
    console.log(`Server is running at port on ${PORT}`);
})











