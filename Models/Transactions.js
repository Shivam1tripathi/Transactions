import mongoose from "mongoose";



const transactionsschema=new mongoose.Schema({
id:{
    type:String,
    required:true,
},
title:{
    type:String,
    required:true,
},
price:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
category:{
    type:String,
    required:true,
},
image:{
type:String,
required:true,
},
sold:{
    type:String,
required:true,
},
dateOfSale:{
    type:String,
    required:true,
},
month:{
    type:String,
    required:true,
}
})
export default mongoose.model('Transactions',transactionsschema);