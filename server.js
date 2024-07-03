import express from 'express';
import morgan from 'morgan';
import Routes from './Routes.js'
import dotenv from 'dotenv'
import cors from 'cors';
import Dbconnection from './config/db.js';
import path from 'path'

const app=express();
dotenv.config()

//db
Dbconnection();
 

const port=8080;
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./newssite/build')))

app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'./newssite/build'))
})

app.use("/api/v2/auth",Routes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})