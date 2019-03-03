//====================================================
//----------CAMPGROUNDS ROUTES---------------------
//====================================================
var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var middleware = require("../middleware");

// INDEX ROUTE - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
    //res.render("campgrounds", {campgrounds:campgrounds});
    // now retrieve the campgrounds from the db instead of the variable, THEN RENDER THE FILE
    //console.log(req.user)
    
    Camp.find({}, function(err, camp){
        if(err){
            console.log("There has been an error retrieving your data from the db: " + err);
        } else {
            //res.render("campgrounds/index", {campgrounds:camp, thisUser:req.user});
            res.render("campgrounds/index", {campgrounds:camp});
        }
    });
})

// CREATE ROUTE - ADD A CAMPGROUND TO THE DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form 
    var campName = req.body.campName;
    var campImage = req.body.campImage;
    var campDesc = req.body.campDesc;
    var campPrice = req.body.campPrice;
    //var campAuthId = req.user._id;
    //var campAuthName = req.user.username;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var campAdd = {name: campName, image: campImage, description: campDesc, price: campPrice, author: author}
    //console.log(req.user);
    // add to the campgrounds database
    Camp.create(campAdd, function(err, camp){
        if(err){
            console.log("Something Went Wrong: " + err); 
        } else {
            console.log("Data was Added to the Data Base!");
            console.log(camp);
            //redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

// NEW ROUTE - SHOW FORM TO ADD CAMPGROUNDS, needs to be declared before the show route
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

// SHOW ROUTE - SHOW A SPECIFIC COLLECTION ITEM AS OPPOSED TO ALL OF THEM!
router.get("/:id", function(req, res){
/*
    Camp.findById(req.params.id).populate("comments").exec(function(err, singleCamp){
        if(err){
            console.log("There has been an error retrieving your data from the db: " + err);
        } else {
            console.log(singleCamp);
            res.render("show", {campground:singleCamp});
        }
    });
*/
    console.log(req.user);
    Camp.findById(req.params.id).populate('comments').exec(function(err, singleCamp){
        if(err){
            console.log("There has been an error retrieving your data from the db: " + err);
        } else {
            console.log(singleCamp);
            res.render("campgrounds/show", {campground:singleCamp});
        }
    });
});

// EDIT Route
router.get("/:id/edit", middleware.checkCampOwner, function(req, res) {
    // does the campground belong to the user?
    //Camp.findById(req.params.id, function(err, editACamp){
    Camp.findById(req.params.id, function(err, editACamp){
        res.render("campgrounds/edit", {thisCamp:editACamp});
    });
});

// UPDATE Route
router.put("/:id", middleware.checkCampOwner, function(req, res){
    //req.body.submission.body = req.sanitize(req.body.submission.body);
    //req.body.campDesc = req.sanitize(req.body.campDesc);
    Camp.findByIdAndUpdate(req.params.id, req.body.campground, function(err, post){
        if(err){
            console.log("Something went wrong with the update: " + err);
            res.redirect("/campgrounds");
        } else {
            console.log(post);
            //redirect to the specifically edited campground page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE Route
router.delete('/:id', middleware.checkCampOwner, function (req, res) {
    Camp.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("You couldn't delete this Post for Some Reason"); 
            res.redirect("/campgrounds");
        } else {
            console.log("You have successfully deleted this value!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;