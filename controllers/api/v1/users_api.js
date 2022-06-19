
const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.create_session = async function (req, res) {

try{
    let user= await User.findOne({email:req.body.email});
    if(!user||user.password!=req.body.password)   
    {
        return res.json(422,{
            messaege:"Invalid username/password"
        })

    }
    return res.json(200,{
        message:"Sign in Successful, Here is your token keep it safe",
      data:{
        token: jwt.sign(user.toJSON(),'codeial',{expiresIn:'1000'})
      }
    })
}
catch(err)
{
    console.log('Ee',err);
        return res.json(500,{
            messae: "internal Server error"
        })

}


}
  