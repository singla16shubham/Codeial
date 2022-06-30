const mongoose=require('mongoose');
const likeSchema=new mongoose.Schema({
 user: {
    type: mongoose.Schema.Types.ObjectId
 },
//  This defines the objectId of the liked post
 likeable:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    refPath: 'onModel'
 },
//  thi sfield is used for defining the type ofliked object as this is a dynamic reference
 onModel:{
    type:String,
    required:true,
    enum: ['Post','Comment']

 }


},
{
    timestamps:true
}
)

const Like=mongoose.model('Like',likeSchema);
module.exports=Like;