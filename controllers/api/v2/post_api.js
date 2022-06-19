const Post=require('../../../')
module.exports.index=async function(req,res)
{
    let posts = await Post.find({})
            .sort("-createdAt")
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            })
    return res.json(200,{
        message: "List of Posts 2",
        posts: []
    })
}