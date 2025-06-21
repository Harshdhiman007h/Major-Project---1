const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

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

app.get("/test", async(req, res)=>{
    let sampletest = new Listing({
        title: "My New Villa",
        description: "By the beach",
        price: 150000,
        location: "Goa",
        country: "India",
    });

    await sampletest.save();
    console.log("Sample was saved");
    res.send("successful testing");
});

app.listen(8080 ,()=>{
    console.log("server is Working");
});