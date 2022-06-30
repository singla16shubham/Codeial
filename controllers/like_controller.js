const Comment = require('../models/comment')
const Post = require('../models/post');
const Like=require('../models/likes');

module.exports.toggleLike= async function(req,res)
{
  try{

    let likeable;
    // this deleted is to dec inc the count of the likes depending on its value false ot true
    let deleted=false;
//    we will get reqeust as /likes/toggle/id=kdkk&type=post/comment

   if(req.query.type=="Post"){
    likeable=await Post.findById(req.query.id).populate('likes');
   }else{
    likeable=await Comment.findById(req.query.id).populate('likes');

   }

//    check if like already exist
let existingLike=await Like.findOne({
    likeable: req.query.id,
    user: req.user._id,
    onModel: req.query.type
})
// if a like already exist then delet it
if(existingLike)
{
   likeable.likes.pull(existingLike._id);
   likeable.save();
   existingLike.remove();
   deleted=true
}
else{
    let newLike=await Like.create({
        user:req.user._id,
        likeable:req.query.id,
        onModel: req.query.type
    })
    likeable.likes.push(newLike._id);
    likeable.save();
}
return res.json(200,{
    message: "Request Successful",
    data:{
        deleted:deleted
    }

})


  }
  catch(err)
  {
    if(err)
    {
        console.log("Error",err);
        return res.json(500,{
            message: "Internal Server error",
           
        })
    }
  }

}  