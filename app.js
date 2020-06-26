//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Post your thoughts to the world , let them know how you see the world ."
const aboutContent = "This is an self assined project-build using JavaScript, Ejs ,NodeJs and Mongoose ";
const contactContent = "Gmail - Sharmadeep698@gmail.com"
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-deep:dreamdeep3@cluster0-ziicf.mongodb.net/Boss',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const app = express();
const DataSchema = new mongoose.Schema({
  title: String,
Content: String
})
const Data = mongoose.model("Data", DataSchema )
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res){
  Data.find({},(err,posts)=>{
    (err) ? console.log("error while upload") 
    :
     res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
  })
 
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  
const DataBase = new Data({
    title :req.body.postTitle,
    Content:req.body.postBody
  })
    DataBase.save((err,doc)=>{
      (err) ? console.log(err) 
      :  
      res.redirect("/");
    })


});

app.get("/posts/:postName", function(req, res){

    const requestedTitle = _.lowerCase(req.params.postName);
    Data.find({},(err,posts)=>{
    (err) ? console.log("error while calling the data ") 
    :
    posts.map((post)=>{
       const storedTitle = _.lowerCase(post.title);
      if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.Content
      });
    }
    })
    
  })

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
