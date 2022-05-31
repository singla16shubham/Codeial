const User=require('../models/user')

module.exports.profile=function(req,res)
{   if(req.cookies.user_id)
    { User.findById(req.cookies.user_id,function(err,user){
        if(err){console.log("Error in finding user in signing up"); return;}
        else{
            if(user)
            {
            return res.render('user_profile',{
                title: "users Profile",
                user_name: user.name,
                user_email:user.email
                // user:user    it also works in place of above just have to chage in profile.ejs also
                // name:"Shubham"
            });
             }
            else{

                return res.redirect('/users/sign-in');
            }
        }



    })

    }
    else{
        return res.redirect('/users/sign-in');
    }
  
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
// User sign-up
module.exports.create=function(req,res){
    // TODO later;
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
//    find user
User.findOne({email:req.body.email},function(err,user)
{
    if(err){console.log("Error in finding user in signing up"); return;}
//    Handle if found
    if(user)
    {

//    Handle password if not match
if(user.password!=req.body.password)
{
    return res.redirect('back');
    console.log("Passwords do not match Please enter again");
}

//    Handle session-creation
res.cookie('user_id',user.id);
return res.redirect('/users/profile');

    }
    else{
        // Handle if not found
        return res.redirect('back');

    }
})









}