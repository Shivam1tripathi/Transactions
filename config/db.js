import mongoose from "mongoose";
const Dbconnection =async()=>{
    try{
        const conn=await mongoose.connect(process.env.Mongodb_URL);
        console.log(`Connection made successfully ${conn.connection.host}`);
    }catch(error){
console.log(`Connection failed ${error}`);
    }
}
export default Dbconnection;