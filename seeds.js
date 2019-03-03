var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Rock Bonfire", 
        image: "https://images.unsplash.com/photo-1519908963259-6abf60e36d61?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0eb086f5c18d96ff424e3effeefb72aa&auto=format&fit=crop&w=636&q=80", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Flat Lands", 
        image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=384a51f2b8eaff486e080f101afc8192&auto=format&fit=crop&w=635&q=80", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Snow Valley", 
        image: "https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d1156d3e4dfafbc71a9f293939f3243&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Mountain Top", 
        image: "https://images.unsplash.com/photo-1483381719261-6620dfa2d28a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b201f4cac49215d2be151bb4d5bc454f&auto=format&fit=crop&w=1055&q=80", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Planet Endor", 
        image: "https://images.unsplash.com/photo-1529025797902-c04dc9523016?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0220add331b26be9cac070a9aa84a743&auto=format&fit=crop&w=1050&q=80", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Echo Base", 
        image: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?ixlib=rb-0.3.5&s=8a0ef66b6f2b1e32dbc810c44b5ab396&auto=format&fit=crop&w=1050&q=80", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Mos Eisley", 
        image: "https://images.unsplash.com/photo-1527736848781-72dc3b2ee00f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=65bbb241a895844f772372cd39e040b2&auto=format&fit=crop&w=963&q=80", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Yavin IV", 
        image: "https://images.unsplash.com/photo-1508035460735-91088c495500?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=06042d60469bc6697954fe9e73c9f954&auto=format&fit=crop&w=967&q=80", 
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Tatooine", 
        image: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc623e7131495d44392a2cf78c100df6&auto=format&fit=crop&w=1049&q=80", 
        description: "This is the lego version of a StormTrooper just chilling out in Tatooine!"
    },
    {
        name: "Crait", 
        image: "https://images.unsplash.com/photo-1530812074867-b93347a3bd10?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7c52da160621bd8238eacc5a55170770&auto=format&fit=crop&w=1183&q=80", 
        description: "An old desolate mining world, legend has it that this was the unofficial site for the first meeting of the rebellion!"
    }
]
 
function seedDB(){
    //Remove all campgrounds
    Camp.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            } else {
                console.log("removed comments!");
                //add a few campgrounds
                /*
                data.forEach(function(seed){
                    Camp.create(seed, function(err, camp){
                        if(err){
                            console.log(err)
                        } else {
                            console.log("added a campground");
                            //create a comment
                            Comment.create(
                                {
                                    text: "This place is great, but I wish there was internet",
                                    author: "Homer"
                                }, function(err, comments){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        camp.comments.push(comments);
                                        camp.save();
                                        console.log("Created new comment");
                                    }
                                }
                            );
                        }
                    });
                });
                */
            }
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;