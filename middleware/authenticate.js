const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
;


const Authenticate = async (req,res, next) =>{
    try{
        const {jwtoken} = req.cookies
        // console.log(req.cookies); //{ jwtoken : 'fljalfajflajflajfalfjalffjal...'}
        // console.log(jwtoken); //fljalfajflajflajfalfjalffjal...
        // console.log(jwtoken)

        if(!jwtoken) {
            return res.status(401).json({
                message : "Please login first"
            });   
        }


        const verfiyToken = await jwt.verify(jwtoken,process.env.JWT_SECRET);
        
        // console.log(verfiyToken); //{ _id: '624a85ed92385e03af967961', iat: 1649051723 }

        const rootUser = await User.findOne({_id: verfiyToken._id, "tokens.token":jwtoken})

        if(!rootUser) {throw new Error("User not Found")}

        req.token = jwtoken;
        req.rootUser = rootUser
        req.userID = rootUser._id;

        next();

    }catch (err){   
        res.status(401).send("Unauthorize Access : No Token Found");
        console.log(err)
    }
}

module.exports = Authenticate