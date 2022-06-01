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

module.exports=passport;