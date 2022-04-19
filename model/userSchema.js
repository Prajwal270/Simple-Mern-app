const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    work: {
        type: String,
        
    },
    password: {
        type: String,
        required:true
    },
    cpassword: {
        type: String,
        required:true
    },
    date :{
        type : Date,
        default : Date.now
    },
    messages : [
        {
            name:{
                type:String,
                required:true 
            },
            email: {
                type: String,
                required:true
            },
            phone: {
                type: Number,
                required:true
            },
            message: {
                type: String,
                required:true
            }
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "Message"
        }   // this is the array of messages

    ],
    tokens:[
        {
            token: {
                type:String,
                required:true
            }
        }
    ]
})


userSchema.pre('save', async function(next){
    
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        // generating token for the id who just logged in 
        let token = jwt.sign({_id:this._id},process.env.JWT_SECRET )

        //now we have to save it to database as many time as it is generated
        // inside the document of respective user (of which when the user have logged in)
        // so making a token field inside userSchema
          this.tokens = this.tokens.concat({token:token})
          await this.save()
          return token;
    }catch(err){
        console.log(err)
    }
}

userSchema.method.addMessage = async function(name,email, phone, message){
    try{
        // this is the user who is logged in
        // we have to add the message to the user

    this.messages = this.messages.concat({name,email,phone,message})
    await this.save();
    return this.messages;
    }catch(err){
        console.log(err)
    }
}





const User = mongoose.model('User', userSchema);
module.exports = User;