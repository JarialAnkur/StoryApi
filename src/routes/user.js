const express=require("express");
const User=require("../models/user");
const router = new express.Router();    

router.post("/user",async (req,res)=>{
    const user=new User(req.body);
    try{
        const token=await user.generateToken();
        res.status(200).send();
    }catch(e){
       res.status(404).send({error:"This email is already registered"});
    }
})
router.post("/login",async (req,res)=>{
    try{
    const user= await User.findByCredentials(req.body.Email,req.body.Password);
    const token=await user.generateToken();
    res.status(200).send({user,token});
    }catch(err){
        res.status(404).send({error:"Wrong credentials"});
        
    }
})
module.exports=router;