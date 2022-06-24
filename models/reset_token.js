const mongoose=require('mongoose');
const tokenSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken:{
        type:String
    },
    isValid:{
        type:Boolean
    }
},{
    timestamps:true
})
const Token = mongoose.model('Token', tokenSchema);

module.exports=Token;