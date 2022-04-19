const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Authenticate = require('../middleware/authenticate');
require('../db/conn')
const User = require('../model/userSchema');


router.get('/', (req,res)=> {
    res.send(`Hello world`)
});


// USING ASYNC AWAIT 
router.post('/register', async  (req,res) => {

    // getting data of user (through the registration form)
    // using object destructing concept
    const {name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword ){
        return res.status(422).json({
            error:'Please the fill the field Proprely'
        });
    }

    try{
        const userExits = await User.findOne({email:email});

        if(userExits) {
            return res.status(422).json({error : "User already Exits"});
        }else if(password != cpassword){
            return res.status(422).json({error:"Password is not Matching"});
        }else{

        const user = new User({name, email, phone, work, password, cpassword});

        await user.save();

        res.status(201).json({message: "User Registration Successfull"});
        }

    }catch (err){
        console.log(err)
    }

})



router.post('/signin', async(req,res) => {
    const {email, password} = req.body;
    
    if(!email || !password){
        return res.status(422).json({error : "Please fill the details Properly"})
    }

    try{
       const userLogin = await User.findOne({email:email})
       
       if(userLogin){

            const isMatch = await bcrypt.compare(password, userLogin.password)

            const token = await userLogin.generateAuthToken();
            // console.log(token);

            res.cookie('jwtoken',token,{
                // when to expire
                // after how many minutes, u want the user to be looged out automatically
                // here we r expiring the user in 30 days
                expires : new Date(Date.now() + 25892000000),
                httpOnly : true
            });
            
        if(!isMatch) {
             res.status(422).json({error : "Invalid Credentials"});
        }else{
            res.json({message: "User Signed In Successfully"});
        }

       }else{
            res.status(422).json({ error: "Invalid Credentials"});
       }


    }catch (err){
        res.status(422).json({
            success: false,
            message : err.message,
        });
    }

})

// Logout
router.get('/logout',async(req,res) => {

    try{


        const user = await User.findOne({_id:req.userID});

        // if(user){
        //     user.tokens = user.tokens.filter((token) => {
        //         return token.token !== req.token;
        //     });

        //     await user.save();
        //     res.json({message : "User Logged Out Successfully"});
        // }else{
        //     res.status(422).json({error : "User Not Found"});
        // }


        // user.tokens = user.tokens.filter((token) => {
        //     return token.token != req.token
        // })
        // await user.save();
        
    
        res.clearCookie('jwtoken',{path:'/' }).status(200).json({
            success: true,
            message : "User Logged Out Successfully"
        })
    }catch(err){
        res.status(400).json({
            success: false,
            message : err.message,
        });
    }

    // try{
    //     const {userID} = req.rootUser;
    //     const user = await User.findById(userID);
    //     user.tokens = user.tokens.filter((token) => {
    //         return token.token !== req.token
    //     })
    //     await user.save();
    //     res.status(200).json({message : "User Logged Out Successfully"});
    // }catch (err){
    //     res.status(400).json({
    //         success: false,
    //         message : err.message,
    //     });
    // }



})

// MY Profile
router.get('/about', Authenticate, async (req,res)=> {
    try{
        const user = await User.findById(req.userID);
        res.send(user);

        // res.status(200).json({
        //     success:true,
        //     user,
        // });


    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });

    }
})

// For Home and Contact Front Page 
router.get('/getData', Authenticate, async (req,res)=> {
    try{
        const user = await User.findById(req.userID);
        res.send(user);
    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });

    }
})

// Contact Us 
router.post('/contact', async (req,res) => {

    try{
        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message){
            return res.status(422).json({error : "Please fill the details Properly"})
        }
        const userContact = await User.findOne({_id:req.userID});
        
        if(userContact){
            const userMessage = await userContact.addMessage(name, email, phone, message);
        }
        await userContact.save();
        res.status(201).json({message : "Message Sent Successfully"});

        //*******github recommended */
        // user.message = message;
        // await user.save();

        // const contact = new Contact({name, email, phone, work, message});

        // await contact.save();

        // res.status(201).json({
        //     success: true,
        //     message: "Message Sent Successfully"
        // })
        


    }catch(err){
        res.status(400).json({
            success: false,
            message: err.message,
        });


    }
    // const {name, email, phone, message} = req.body;

    // if(!name || !email || !phone || !message){
    //     return res.status(422).json({error : "Please fill the details Properly"})
    // }

    // try{
    //     const contact = new User({name, email, phone, message});
    //     await contact.save();
    //     res.status(201).json({message : "Message Sent Successfully"});
    // }catch(err){
    //     res.status(400).json({
    //         success: false,
    //         message : err.message,
    //     });
    // }

})

router.post('/update', Authenticate, async (req,res) => {
        
    try{
        const user = await User.findById(req.userID);
        const {name, email, phone, work} = req.body;
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.work = work;
        await user.save();
        res.status(201).json({message : "User Updated Successfully"});
    }catch(err){    
        res.status(400).json({
            success: false,
            message : err.message,
        }); 
    }
})



module.exports = router;



// // REGISTRATION OF USER DATA USING PROMISES
// // to get the registration data from user
// router.post('/register',(req,res) => {

//     // getting data of user (through the registration form)
//     // using object destructing concept
//     const {name, email, phone, work, password, cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword ){
//         return res.status(422).json({error:'Please the fill the field Proprely'})
//     }

//     // check if the user is already registered before
//     User.findOne({ email: email})
//         .then((userExits) =>{
//             if(userExits){
//                 return res.status(422).json({error : "Email already Exits "})
//             }

//             // saving the user data to database
//             // const user = new User(req.body) // this will save all the data to databas
            
            
//             // const user = new User({name:name, email:email, phone:phone, work:work, password:password, cpassword:cpassword})
//             // But if both key and value are same, then no need to write both 
//             // it is enough to write one 

//             const user = new User({name, email, phone, work, password, cpassword});

//             user.save().then(() => {
//                 res.status(201).json({message:"User Registration Successfull"})
        
//             }).catch((err) => res.status(500).json({error:"Failed to register"}))

//     }).catch(err => {console.log(err) })

//     // console.log(req.body);
//     // // res.send("This is Registration Page");
//     // res.json({message:req.body})
// })