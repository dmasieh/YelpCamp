var express = require("express");
var router = express.Router({mergeParams: true});
var Camp = require("../models/camp");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//no need to "GET" /campgrounds/:id/comments since that's already part of the campgrounds show route

// COMMENTS Create FORM, As a separate page
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.log("There has been an error retrieving your data from the db: " + err);
        } else {
            res.render("comments/new", {campground:camp}); 
        }
    })
});

// POST A COMMENT
router.post("/", middleware.isLoggedIn, function(req, res) {
    Camp.findById(req.params.id, function(err, campground){
        if(err){
            console.log('There has been an error' + err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', 'Something Went Wrong, Unable to Create Comment')
                    console.log('There has been an error' + err);
                    res.redirect("/campgrounds");
                } else {
                    // ADD user name and user id to the comments
                    //console.log("THE USERNAME OF WHOEVER WROTE THIS COMMENT IS " + req.user.username);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // THEN save the comment into the campgrounds array
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash('success', 'Successfully Added Comment!');
                    res.redirect("/campgrounds/" + campground._id);
                }
                
            });
        }
    });
});


// COMMENTS Edit FORM, Not as a separate page, but rather, part of the show page
/*
router.get("/:comment_id/edit", checkCommentOwner, function(req, res){
    Camp.findById(req.params.id, function(err, aCampground) {
        if(err){
            console.log("WE CAN't FIND THE CAMPGROUND OR COMMENT BRUH");
        } else {
            Comment.findById(req.params.comment_id, function(err, aComment) {
                if(err){
                    console.log("There has been an issue going to the edit page sir!")
                } else {
                    res.render("comments/edit", {thisComment: aComment, campground:aCampground});
                }
            });  
        }
    });
});
*/
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    Comment.findById(req.params.comment_id, function(err, aComment) {
        if(err){
            console.log("There has been an issue going to the edit page sir!")
        } else {
            res.render("comments/edit", {thisComment: aComment, campground_id:req.params.id});
        }
    });  
});

// COMMENTS EDIT/UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, aComment) {
        if(err){
            console.log("There has been an issue going to the edit page sir!")
        } else {
            console.log(aComment);
            res.redirect("/campgrounds/" + req.params.id);
        }
    });  
})

// COMMENTS DELETE Route
router.delete('/:comment_id', middleware.checkCommentOwner, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err, aComment) {
        if(err){
            console.log("There has been an issue going to the edit page sir!")
        } else {
            console.log(aComment);
            req.flash('success', 'Comment Deleted!')
            res.redirect("/campgrounds/" + req.params.id);
        }
    });  
});

module.exports = router;