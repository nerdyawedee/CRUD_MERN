const express = require('express');
const cors = require('cors');
const app = express();
const Port = 8000;

const Mongo = require('./DB/conne');
Mongo();

app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","GET,PUT,DELETE,POST")
    res.header("Access-Control-Allow-Headers","Content-Type")
    next();
})
const router = require('./Router/router');
app.use(router);

app.listen(Port,()=>{
    console.log(`Server is working on the port ${Port}`)
})