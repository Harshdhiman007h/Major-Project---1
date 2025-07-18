const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res)=>{
    res.send("Hi, I am Root");
});

app.get("/listings" ,async(req, res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings } );
});

app.get("/listings/new", (req, res)=>{
    res.render("./listings/new.ejs");
});

app.post("/listings" ,async(req, res)=>{
    let newlistings = new Listing(req.body.listing);
    await newlistings.save();
    res.redirect("/listings");
});

app.get("/listing/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        return res.status(404).send('Listing not found');
    }
    res.render("./listings/edit.ejs",{ listing });
});

app.get("/listings/:id" , async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing});
});

app.put("/listings/:id" , async(req , res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.get("/listing/:id/delete", async( req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

// app.get("/test", async(req, res)=>{
//     let sampletest = new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 150000,
//         location: "Goa",
//         country: "India",
//     });

//     await sampletest.save();
//     console.log("Sample was saved");
//     res.send("successful testing");
// });

app.listen(8080 ,()=>{
    console.log("server is Working");
});