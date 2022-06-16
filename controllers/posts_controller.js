const Post = require('../models/post');
const Comment = require('../models/comment');

// const Post=require('../models/post');
module.exports.create = async function (req, res) {

    try {
       let post= await Post.create({
            content: req.body.content,
            user: req.user._id

        })
        if(req.xhr)
        {   
            // post = await post.populate('user', 'name').execPopulate();
            // This will help us to add the user name dynamically
            let newPost = await Post
                    .populate(post, {
                        path: 'user',
                        select: 'name'
                    });
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created"
            })
        }

       
        req.flash("success","Post added Successfully");
        return res.redirect('back');

    }
    catch (err) {

        req.flash("error", "Error in posting");
        return res.redirect('back');
    }
}


module.exports.destroy = async function (req, res) {
    try{
        let post=await Post.findById(req.params.id);
          
            if(post.user==req.user.id){
               
                // await Like.deleteMany({_id: {$in: post.comments}});
                post.remove();
           
                await Comment.deleteMany({post:req.params.id});

                if (req.xhr){
                    // console.log("hello");
                    
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
    
                req.flash('success','Post and associated comments deleted!');
                return res.redirect('back');
            }
            else{
                req.flash('error', 'You cannot delete this post!');
                return res.redirect('back');
            }
        }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }

    // try {
    //     let post = await Post.findById(req.params.id);
      
    //     if (post.user == req.user.id) {
    //         post.remove();
    //         await Comment.deleteMany({ post: req.params.id });
    //         if (req.xhr){
    //             return res.status(200).json({
    //                 data: {
    //                     post_id: req.params.id
    //                 },
    //                 message: "Post deleted"
    //             });
    //         }

    //         req.flash("success","Post deleted successfully");
    //         return res.redirect('back');

    //     }
    //     else {
    //         req.flash('error',"You cannot delete this post");
    //         return res.redirect('back');
    //     }

    // }
    // catch (err) {
    //     req.flash('error',"Error in deleting");
    //     console.log("Error", err);
    //     return;
    // }


}