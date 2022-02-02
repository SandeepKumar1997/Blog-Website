const express=require('express');
const app =express();
const bodyParser=require('body-parser');
const res = require('express/lib/response');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
app.set('view engine', 'ejs');

const postItems=[];
// Home Page Server
app.get("/",(req,res)=>{
 res.render("home",{page:"homepage",items:postItems});
})

// Add new Post page

app.get("/newpost",(req,res)=>{
 res.render("addpost",{page:"newpost"})

})

app.post("/newpost",(req,res)=>{
 postItems.push(req.body.postText)
 res.redirect("/")
 console.log(postItems)
})

app.listen(3000,()=>{
 console.log("Server is listening to port 3000")
})