const mongoose = require('mongoose');
const Db = "mongodb+srv://CURD-OPERATION:123qwe.@cluster0.d38funb.mongodb.net/";

const MongoDb = async()=>{
    try {
        await mongoose.connect(Db);
        console.log("connected successfully");
    } catch (error) {
        console.log("Data connection is not done properly",error);
    }
}
module.exports = MongoDb;