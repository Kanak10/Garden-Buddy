const dotenv = require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser= require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var findOrCreate = require("mongoose-findorcreate");
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const saltRounds = 10;
const URL = "mongodb+srv://Kanak:Kanak@cluster0.z7y2utm.mongodb.net/userDB?retryWrites=true&w=majority";

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: process.env.CLIENT_ID,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery", true);
mongoose.connect(URL, {useNewUrlParser: true}, err=>{
    if (!err) {
        console.log("Connected Successfully")
    } else {
        console.log(err);
    }
});

const userSchema = new mongoose.Schema ({
    name: String,
    email: {
        type: String,
        requires: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/home",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] }));

app.get("/auth/google/home", 
  passport.authenticate('google', { failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/home");
  });

app.get("/home", (req, res)=>{
    res.render("index");
});

app.route("/")
    .get(
        (req, res)=>{
            res.render("login");
        }
    )
    .post(
        (req, res)=>{
            if (req.body.name) {
                bcrypt.hash(req.body.password, saltRounds, (err, hash)=>{
                    const newUser = new User ({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });
    
                    newUser.save(err=>{
                        if (!err) {
                            console.log("Saved successfully");
                            res.render("index");
                        } else {
                            console.error(err);
                        }
                    });
                });
            } else {
                User.findOne({email: req.body.email}, (err, foundUser)=>{
                    if (err) {
                        console.error(err);
                    } else {
                        if (foundUser) {
                            bcrypt.compare(req.body.password, foundUser.password, (err, result)=>{
                                if (result === true) {
                                    res.render("index");
                                } else {
                                    console.log(err);
                                    console.log("Wrong Password Try Again");
                                    res.redirect("/");
                                }
                            });
                        }
                    }
                });
                console.log(req.body);
            }
            
        }
    );

app.get("/model", (req, res)=>{
    res.render("model");
});

app.get("/model/cure",async (req, res)=>{
    console.log("hello");
    const data = await JSON.parse(localStorage.getItem('disease'));
    console.log("Disease Data",data);
    console.log("bye");
    res.render("cure");//, {disease: diseaseDetail.disease});
});

app.listen(3000, ()=>console.log("Server started on port 3000"));