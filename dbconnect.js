const MongoClient = require("mongoose");
async function dbconnect() {
await MongoClient.connect("mongodb://127.0.0.1:27017/app").then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log("connection unsuccessful");
});

}
module.exports=dbconnect;