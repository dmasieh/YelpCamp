var bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    express = require('express'),
    passport = require("passport"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    app = express(),
    Comment = require("./models/comment"),
    Camp = require("./models/camp"),
    seedDB = require("./seeds");
    
// Declare our route REQUIREMENT variables
var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    allElseRoutes       = require("./routes/index");


// USE a Database URL declared in the environment variables, otherwise, default to 
// DB Connection String that is localized/declared below, if the string doesn't exist
// Then default to the localized MongoDB Instance
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));

// initialize and require express sessions with a few arguments as a single combined statement
app.use(require("express-session")({
    secret: "Moe's Is Better Than Chipotle, Change My Mind!",
    resave: false,
    saveUninitialized: false
}));

// Initialize/execute flash messaging package variables(make sure this comes before passport)
app.use(flash());

// initialize passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

//initialize method override
app.use(methodOverride("_method"));

// methods responsible for encoding and/or unencoding the sesssions, oh and also authenticating and logging in
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + "/public"));

//pass in variable that declares if user is logged in or not to every route instead of manueally typing it in
app.use(function(req, res, next){
    res.locals.thisUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// app.use our routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(allElseRoutes);

app.set('view engine', 'ejs');

// seed the database after deleting whatever comments and/or campgrounds we're already there
// seedDB(); 
//console.log(__dirname);

// START THE SERVER
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server has started and is Running on Port " + process.env.PORT + " and IP Address " + process.env.IP); 
});