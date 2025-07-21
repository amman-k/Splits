const express = require("express");
const mongoose=require("mongoose");
const cors = require("cors");
require('dotenv').config();
const connectDB=require("./config/db");

connectDB();

const app=express();
const PORT=process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/api/groups', require('./routes/groups'));

app.listen(PORT,()=>{
    console.log(`server is listening on the port ${PORT}`);
});



