const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var _ = require('lodash');
const res = require("express/lib/response");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const postItems = [];
// Home Page Server
app.get("/", (req, res) => {
  res.render("home", { page: "homepage", items: postItems });
});

// Add new Post page

app.get("/newpost", (req, res) => {
  res.render("addpost");
  console.log(req.params.post);
});

app.post("/newpost", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.postText,
  };
  postItems.push(post);
  res.redirect("/");
  console.log(postItems);
});

app.get("/:postTitle",(req,res)=>{
 const postRequest=_.lowerCase(req.params.postTitle);
console.log(postRequest);
 postItems.find((post)=>{
  if(_.lowerCase(post.title)===postRequest){
   res.render("post",{
    title:post.title,
    content:post.content
   })
  }


 });

})

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});
