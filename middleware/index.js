var Camp = require("../models/camp");
var Comment = require("../models/comment");

var middlewareObj = {}

middlewareObj.checkCampOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, editACamp){
            if(err){
                req.flash('error', 'Campground was Not Found');
                res.redirect('/campgrounds');
            } else {
                if(editACamp.author.id.equals(req.user._id)) {
                    next();
                } else {
                    console.log("YOU DO NOT HAVE PERMISSION TO DO THAT!!!!");
                    //res.redirect('back')
                    req.flash('error', 'You do not have permission to do that!');
                    //var backURL = req.header('Referer') || '/';
                    //res.redirect(backURL);
                    res.redirect('/campgrounds');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that!');
        //res.redirect('back');
        res.redirect('/login');
    }
}

middlewareObj.checkCommentOwner = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, editComment) {
            if(err){
                res.redirect('back');
            } else {
                if(editComment.author.id.equals(req.user._id)) {
                    console.log(editComment.author.id);
                    console.log(req.user._id);
                    next();
                } else {
                    console.log("YOU DO NOT HAVE PERMISSION TO DO THAT!!!!");
                    req.flash('error', 'You need to have written that comment in order to edit it!');
                    res.redirect('/campgrounds');
                }
            }
        });
    } else {
        req.flash('error', 'You need to be logged in to do that.');
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect("/login");
}

module.exports = middlewareObj;