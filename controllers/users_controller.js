module.exports.profile=function(req,res)
{
    return res.render('user_profile',{
        title: "users",
        // name:"Shubham"
    });
}
// We are adding action
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:'Codeial | SignUp'
    });
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:'Codeial | SignIn'
    })
}

module.exports.create=function(req,res){
    // TODO later;
}