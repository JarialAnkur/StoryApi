const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


const userSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        unique:true,
        autoIndex:true,
        required:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid E-mail address");
            }
        }

    },
    Password:{
        type:String,
        required:true,
        minlength:8,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
});

userSchema.index({  Email: 1 }, { unique: true});

userSchema.methods.generateToken = async function (){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'process.env.JWT_SECRET')
   user.tokens=user.tokens.concat({token})

   await user.save()

    return token
}

userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()

    delete userObject.Password
    delete userObject.__v
    delete userObject.tokens

    
    return userObject
}

userSchema.statics.findByCredentials=async (Email,Password)=>{
    const user=await User.findOne({Email});
    if(!user)
    {
        
        throw new Error("Wrong Credentials");
    }
    const isMatch=await bcrypt.compare(Password,user.Password);
    if(!isMatch)
    {
        
        throw new  Error('Wrong credentials');
    }
    return user;
}
userSchema.pre("save",async function(next){
    const user=this;
    if(user.isModified('Password')){
        user.Password=await bcrypt.hash(user.Password,8);
    }
    next()
})

const User=mongoose.model("users",userSchema);
module.exports=User;