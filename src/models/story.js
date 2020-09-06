const mongoose=require("mongoose");

const  userSchema=mongoose.Schema({
    Title:{
        type:String,
        required:true,
        trim:true
    },
    Story:{
        type:String,
        trim:true,
        required:true
    }
})

userSchema.methods.toJSON=function(){
    const story=this
    const storyObject=story.toObject()

    
    delete storyObject.__v
    

    
    return storyObject
}
const Story=mongoose.model("Story",userSchema);
module.exports=Story;