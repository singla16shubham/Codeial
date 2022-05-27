module.exports.profile=function(req,res)
{
    return res.render('user_profile',{
        title: "users",
        // name:"Shubham"
    });
}
// We are adding action
module.exports.signup=function(req,res){
    return res.render('user_sign_up',{});
}