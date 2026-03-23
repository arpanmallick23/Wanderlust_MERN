const listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req,res) => {
    let Listing = await listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    Listing.reviews.push(newreview);

    await newreview.save();
    await Listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${Listing._id}`);
};

module.exports.destroyReview = async (req,res) => {
    let {id, reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};