const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function (req, res) {

    // Now we are using the async awiat so that our code will look cleaner and better
    //  if any error comes catch will be used
    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
        let users = await User.find({})

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    }
    catch (err) {
        console.log("Error",err)

    }
}