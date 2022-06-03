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


    }
},
    {
        timestamps: true
    })

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
