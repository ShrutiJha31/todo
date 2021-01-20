const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var db = require('./db')

const EventsRoutes = require("./routes/events");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/events", EventsRoutes);


app.get("/",async (req,res)=>{
    
    res.send("home page");
})



app.listen(PORT,async ()=>{
    console.log('Server successfully started @ '+PORT);
})