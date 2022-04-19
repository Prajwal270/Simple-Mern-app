const mongoose = require("mongoose");

// mongodb+srv://thapa:<password>@cluster0.vyhts.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const DB = process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log(`connection successfull`)
}).catch((err) => console.log(err))