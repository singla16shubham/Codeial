const Comment = require('../models/comment')
const Post = require('../models/post');
var mongoose = require('mongoose');

module.exports.create = async function (req, res) {
    // as req.body.post will give us the id .. as we have named it post in comment form
    // console.log(req.body.post);
    try {
        var id = mongoose.Types.ObjectId(req.body.post.trim());
        // var id=aid.trim();
        // find by id takes an object id not a string so if it is a string then convert it.
        let post = await Post.findById(id);

        // console.log(post)
        if (post) {
            // console.log(req.body.content)
            let comment = await Comment.create({
                content: req.body.content,
                post: id,
                // Should send object id not a string
                user: req.user._id
            })

            // console.log(comment);

            // given by mongo db 
            // adding the comment to the comments array of the post
            // console.log(post);
            post.comments.push(comment)
            post.save();
            if(req.xhr){
                let newComment = await Comment
                .populate(comment, {
                    path: 'user',
                    select:'name'
                });
               

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Added"
                });
            }




            req.flash("success","Comment added Successfully");
            // I had not made the comments as an  array thats why it was not working
            return res.redirect('/')

        }




    }
    catch (err) {
        req.flash("Error","Error in deleting");
        console.log("Error", err);
    }


}


module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id)

        if (comment.user == req.user.id) {
            // as post also has diff comment id so we need to delete that from the post
            let postId = comment.user;
            comment.remove();
            // now comment is removed
            // we have to find the post then delete the id of the comment from there
           let post= await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

           if(req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "comment deleted"
            });
            }   
           req.flash("success","Comment deleted Successfully");

            return res.redirect('back');


        }
        else {
            req.flash("error","Comment not found");
            console.log("Cannot find comment")
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("error", err);
    }


}