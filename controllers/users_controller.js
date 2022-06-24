const User = require('../models/user');
const Token=require('../models/reset_token');
const fs=require('fs');
const path=require('path');
const crypto = require('crypto');
const queue = require('../config/kue');
const passResetMailer=require('../mailers/reset_pass_mailer');
const passResetWorker=require('../workers/pass_reset_worker');
const mongoose=require('mongoose');
const querystring = require('querystring');

module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.params.id)
        return res.render('user_profile', {
            title: "users",
            profile_user: user

        });
    }
    catch (err) {
        console.log("Error", err);
    }
}

// NO need for async await
module.exports.update = async function (req, res) {

   
    if (req.user.id == req.params.id) {
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err)
            { 
                // console.log("Hlloe");
                if(err)
                {
                    console.log('***Multer error',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file)
                {
                    if(user.avatar)
                    {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))

                    }
                    // this is saving the path of uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath+'/'+req.file.filename
                }
                user.save();
                return res.redirect('back');
            })
            // User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            //     return res.redirect('back');
            // });
        }catch(err)
        { 
            // console.log("brr");
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else {
        // status have different codes 200 for success and other status can be searched also
        req.flash('error',"Unauthorised");
        return res.status(401).send('Unauthorised');
    }

}


// We are adding action
// Below two controllers are for header signin and signup 
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | SignUp'
    });
}

module.exports.signIn = function (req, res) {
    // Doing this will ensure that user does not go to sign-in page unless sign out
    
    if (req.isAuthenticated()) {
        console.log(req.user._id);
        return res.redirect("/");
    }

    return res.render('user_sign_in', {
        title: 'Codeial | SignIn'
    })
}
// User sign-up
module.exports.create = async function (req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email });

        // if(err){console.log("Error in finding user in signing up"); return;}
        if (!user) {
            await User.create(req.body)
            return res.redirect('/users/sign-in')

        }
        else {
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log("Error", err);
    }
}



// sign in and create a session for the user
// how are we creating a session??
module.exports.create_session = function (req, res) {
  req.flash('success',"Logged in successfully");
    return res.redirect('back')
}

// req.logout now has become async previously it was sync
module.exports.destroy_session =  function (req, res) {
 
        // req.logout(function(err){ res.redirect('/')});
        req.logout(function(err) {
            if (err) { return next(err); }
            req.flash('success',"Logged Out successfully");
            res.redirect('/');
          });
        
}


module.exports.reset_pass=function(req,res){
    
    return res.render('user_reset_pass',{
        title: "User Password Reset",
        access:false
    });
}

module.exports.reset_mail= async function(req,res){
  

try{
    let user= await User.findOne({ email: req.body.email })
    Token.create({
        user:user,
        accessToken: crypto.randomBytes(30).toString('hex'),
        isValid:true

    },function(err,token){
        if(err)
        {
            console.log("err",err);
        }
        token.save();
        console.log("inside mail",token);
        let job= queue.create('reset',token).save(function(err){
            if(err){
                console.log("error in creating queue",err);
                return

            }
            console.log(job.id);
        })
       

    })
    req.flash('success', 'Password reset link sent. Please check your mail');
    return res.redirect('/')
   
}
catch(err){
    req.flash('error', 'User not found. Try again!');
    return res.redirect('back');
}

    
 };
 


    


module.exports.set_pass= async function(req,res){
   
  
    try{
        let token= await Token.findOne({accessToken:req.params.accessToken})
        if(token.isValid==true)
        {
            // Show the form
            console.log("In token validation");
            // return res.redirect('/');
          return  res.render('user_reset_pass',{
                title:"User password reset",
                access:true,
                token:token
            })
        }
        else
        {
            req.flash('error', 'Link expired');
            return res.redirect('/users/reset_password');
        }
    }
    catch(err)
    {
        console.log("Error in finding token",err);
        return res.redirect('/');
    }
    
   
    
}

module.exports.update_pass= async function(req,res){
    console.log("In the update pass");
    if (req.body.password != req.body.confirm_password) {
        console.log("Wrong pass")
        req.flash('error', "Password Do not match");
        return res.redirect('back');
    }
    else{
        // Need to update the user password... How to get the user
        // console.log("Right password",req.query.accesstoken);
        // console.log("Right password",req.query.accesstoken._id);
        // console.log("Right password",req.query.user);
        // console.log(querystring.parse(req.query.accesstoken));
        // console.log(req.params);
        // console.log(req.params.token);
        // let data=JSON.stringify(req.params.token);
        // console.log(data);
        // let newdata=JSON.parse(data);
        // console.log("newdata",newdata["user"]);
        try{
            console.log(req.params.user);
            var id = mongoose.Types.ObjectId(req.params.user.trim());
          let user= await  User.findById(id);
          let token=await Token.findOne({user: user._id});
          console.log(user);
          console.log(token);
          
             
               user.password= req.body.password;
               token.isValid=false;

            
               user.save();
               token.save();
               console.log(token);
            
    
            req.flash('success', "Password updated. Login now!");
            return res.redirect('/users/sign-in');
        }
        catch(err)
        {
            if(err)
            {
                console.log("No user",err);
            }

        }
 

    }
}
