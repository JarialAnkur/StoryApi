const express=require("express");
const router=new express.Router();
const Story=require("../models/story");

router.post("/addstory",async (req,res)=>{
    const story=new Story(req.body);
    try{
        await story.save();
        res.status(200).send(story);
    }catch(e)
    {
        res.status(404).send(e);
    }
})
router.get("/story/:id",async (req,res)=>{
    try{
    const story=await Story.findById(req.params.id);
    if(!story)
    {
        res.status(404).send({error:"Something went wrong"});
    }
    else{
        res.status(200).send({Story:story});
    }
    }catch(e){
        res.status(404).send(e);
    }
})
router.get("/allstory",async(req,res)=>{

    
    try{
        const stories=await Story.find()
           
        res.status(200).send({Story:stories});
            
        
       
    }catch(e){
        res.status(404).send(e);

    }
})
module.exports=router;