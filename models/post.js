const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true

    },
    // It should refere to user schema
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the id of all the comments in this post schema itself
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'

    }]
},
    {
        timestamps: true
    })

const Post = mongoose.model('Post', postSchema);
module.exports = Post;