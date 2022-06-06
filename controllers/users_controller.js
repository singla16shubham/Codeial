const User=require('../models/user')

module.exports.profile=function(req,res)
{ 
    User.findById(req.params.id,function(err,user)
    {
        return res.render('user_profile',{
            title: "users",
            profile_user:user
            // name:"Shubham"
        });
    })
  
}


module.exports.update=function(req,res)
{ if(req.user.id==req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
    }
    else{
        // status have different codes 200 for success and other status can be searched also
        return res.status(401).send('Unauthorised');
    }
  
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
module.exports.destroy_session=function(req,res)
{ req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
    // req.logout();
    // return res.redirect('/')
}

