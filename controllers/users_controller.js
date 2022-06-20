const User = require('../models/user');
const fs=require('fs');
const path=require('path');

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

