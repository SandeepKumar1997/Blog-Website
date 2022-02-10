const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var _ = require("lodash");
const res = require("express/lib/response");

const mongoose = require("mongoose");
const Blog = require("./blogSchema");
mongoose.connect("mongodb://localhost/blogDB", () => {
  console.log("Database connected");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home Page Server
app.get("/", (req, res) => {
  Blog.find({}, (err, data) => {
    res.render("home", { items: data });
    
  });
  
});

// Add new Post page

app.get("/newpost", (req, res) => {
  res.render("addpost");
});

app.post("/newpost", (req, res) => {
  addBlog();
  async function addBlog() {
    try {
      await Blog.create({
        title: req.body.title,
        blogContent: req.body.postText,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  res.redirect("/");
});

app.get("/:postId", (req, res) => {
  const postID = req.params.postId;
  Blog.findOne({ _id: postID }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.render("post", {
        ID:postID,
        title: doc.title,
        content: doc.blogContent,
        
      });
      
    }
  });
});

app.post("/:postId",(req,res)=>{
  const deletePost=req.params.postId;
  console.log(deletePost)
  Blog.deleteOne({_id:deletePost},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
      console.log(data)
    }
  });
})


app.get("/editpost/:id",(req,res)=>{
  const editpostId=req.params.id;
  Blog.findOne({_id:editpostId},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      res.render("editpost",{titleEdit:data.title,ID:editpostId,contentEdit:data.blogContent})
    }
  })
})

app.post("/editpost/:id",(req,res)=>{
  const updatePost=req.params.id;
  Blog.updateOne({_id:updatePost},{$set:{title:req.body.title,blogContent:req.body.postText}},(err,data)=>{
    if(err){
      console.log(err);
    }else{
      res.redirect("/");
    }
  });
})

const PORT=process.env.PORT;
app.listen(PORT|| 3000, () => {
  console.log("Server is listening to port 3000");
});
