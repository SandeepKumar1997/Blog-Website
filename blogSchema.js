const mongoose=require('mongoose');

const blogSchema=new mongoose.Schema({
 title:String,
 blogContent:{
  type:String,
  required:true
 },
 addedAt:{
  type:Date,
  default:()=>Date.now()
 }
});

module.exports=mongoose.model("Blog",blogSchema);