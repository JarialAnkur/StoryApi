const express=require("express");
const userRoute=require("./routes/user");
const storyRoute=require("./routes/story");
require("./db/mongoose");

const app=express();
const port=process.env.PORT;
app.use(express.json());
app.use(userRoute);
app.use(storyRoute);

app.listen(port,()=>{
    console.log("Server is running ");
})