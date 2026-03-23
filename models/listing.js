const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const review=require("./review.js");

const listingschema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingschema.post("findOneAndDelete", async (Listing) => {
    if(Listing) {
        await review.deleteMany({_id : {$in: Listing.reviews}});
    } 
});

const listing=mongoose.model("Listing", listingschema);
module.exports=listing;