const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: String,
    image: {
        filename: { type: String },
        url: { type: String , default: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing" , listSchema);

module.exports = Listing;