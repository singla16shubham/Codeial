const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

// Authentication with passprt
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function(email,password,done)
    {
// find a user and establish identity
       User.findOne({email:email},function(err,user){
           if(err)
           {
               console.log("Error in finding user-->Passport");
               return done(err);
           }
           if(!user||user.password!=password)
           {
               console.log("Invalid Username / Password");
               return done(null,false);
           }
           return done(null,user);

       })
    }



));


// Serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// Deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log("Error in finding user--->Passprt");
        }
        return done(null,user);
    })
})

passport.checkAuthentication=function(req,res,next)
{    //if user is signed in then pass on the request to next function(controller's action)
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        // req.user contains the current signed in user form the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user
    }
    next();
}

module.exports=passport;