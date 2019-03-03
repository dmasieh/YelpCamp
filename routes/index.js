var express = require("express");
var router = express.Router();
var passport = require("passport")
var User = require("../models/user");

//root route
router.get("/", function(req, res){
    if(req.isAuthenticated()){
        res.redirect("/campgrounds");
    } else {
        res.render("landing");
    }
});

//  ========================================
//  USER/AUTH ROUTES
//  ========================================
router.get("/register", function(req, res) {
    res.render("users/register");
});

// Handling User Sign-Up
router.post("/register", function(req, res){
    // register a new user
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            var authErrMsg = err.message.toString();
            console.log(authErrMsg);
            //var authErrMsg = err.message.toString();
            req.flash('error', authErrMsg);
            //return res.render('users/register');
            res.redirect('/register');
        }
        passport.authenticate("local")(req, res, function(){
            // redirect back to campgrounds if logged in!
            req.flash("success", "Welcome to YelpCamp " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("users/login");
    //console.log(flashMsg)
});

// login form logic/handling, with the middleware and the subsequent callback
router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: 'Invalid username or password.',
        successFlash: 'You Have Sucessfully Logged In!'
    }), function(req, res){
});

// log out without an accompanying log out page, but with some middleware
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You Have Successfully Logged Out!");
    //console.log(req.flash('login-error'))
    res.redirect("/campgrounds");
});

/*
// check if the user is logged in - middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
*/

// WILD CARD ERROR CHECK TO SEE IF THE PAGE THAT THE USER IS LOOKING FOR IS THERE
router.get("*", function(req, res){
    req.flash("error", "That page does not exist!");
    res.redirect("/");
});

module.exports = router;