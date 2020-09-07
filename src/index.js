const express=require("express");
const path=require("path");
const cors=require("cors");
const userRoute=require("./routes/user");
const storyRoute=require("./routes/story");
require("./db/mongoose");

const path
const app=express();
const port=process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(storyRoute);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('public'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '/public/index.html'));
    });
  }
  
  server.listen(port, () => {
    console.log(`listening on PORT ${port}`)
  })