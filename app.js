const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderland";

main()
    .then(()=>{
        console.log("connected to Db");
    })
    .catch(()=>{
        console.log(err);
    })

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res)=>{
    res.send("Hi, I am Root");
});

app.listen(8080 ,()=>{
    console.log("server is Working");
});