const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const {MONGO_URL} = process.env;

const connect = () =>{
    mongoose.connect(MONGO_URL, {
      
    }).then(()=>{
        console.log("Database connected sucessfully");
    })
    .catch((err)=>{
        console.log(`An error occured while connecting to database ${err}`);
    })
}

module.exports = {connect};