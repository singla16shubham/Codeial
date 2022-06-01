const User=require('../models/user')

module.exports.profile=function(req,res)
{
    return res.render('user_profile',{
        title: "users",
        // name:"Shubham"
    });
}
// We are adding action
module.exports.signUp=function(req,res){
    if(req.isAuthenticated())
    {
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | SignUp'
    });
}

module.exports.signIn=function(req,res){
    // Doing this will ensure that user does not go to sign-in page unless sign out
    if(req.isAuthenticated())
    {
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:'Codeial | SignIn'
    })
}
// User sign-up
module.exports.create=function(req,res){
   
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err){console.log("Error in finding user in signing up"); return;}
        if(!user)
        {
            User.create(req.body,function(err,user)
            { if(err){console.log("Error in signing up user"); return;}
            return res.redirect('/users/sign-in')

            })
        }
        else{
            return res.redirect('back');
        }
    })

}
// sign in and create a session for the user
module.exports.create_session=function(req,res){
   
    return res.redirect('/')
}