const Comment = require('../models/comment')
const Post = require('../models/post');
var mongoose = require('mongoose');

module.exports.create = function (req, res) {
    // as req.body.post will give us the id .. as we have named it post in comment form
    console.log(req.body.post);
    
    var id = mongoose.Types.ObjectId(req.body.post.trim());
    // var id=aid.trim();
    // find by id takes an object id not a string so if it is a string then convert it.
    Post.findById(id, function (err, post) {
        console.log(post)
        if (post) {
            // console.log(req.body.content)
            Comment.create({
                content: req.body.content,
                post: id,
                // Should send object id not a string
                user: req.user._id
            },
                function (err, comment) {
                    console.log(comment);
                    if (err) {
                        console.log('Error in creating the comment',err);
                        return;
                    }
                    // given by mongo db 
                    // adding the comment to the comments array of the post
                    console.log(post);
                    post.comments.push(comment)
                    post.save();
                    // I had not made the comments as an  array thats why it was not working
                    return res.redirect('/')
                })
        }
        if(err)
        {
            console.log(err,"this is the error");
        }

    })
}


module.exports.destroy=function(req,res)
{

    Comment.findById(req.params.id,function(err,comment)
    {
        if(comment.user==req.user.id)
        {
            // as post also has diff comment id so we need to delete that from the post
            let postId=comment.user;
            comment.remove();
            // now comment is removed
            // we have to find the post then delete the id of the comment from there
            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                if(err)
                {
                    console.log("Error in deleting comment")
                }
                return res.redirect('back');
            });

        }
        else{
            console.log("Cannot find comment")
            return res.redirect('back');
        }
    })
}