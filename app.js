import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;
const URL = "mongodb+srv://Kanak:Kanak@cluster0.z7y2utm.mongodb.net/userDB?retryWrites=true&w=majority";

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

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

const User = mongoose.model("User", userSchema);

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

// app.route("/homePage")
//     .get(
//         (req, res)=>{
//             res.render("index");
//         }
//     ).post();

app.listen(3000, ()=>console.log("Server started on port 3000"));