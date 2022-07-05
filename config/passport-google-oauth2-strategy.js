const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto')
const User=require('../models/user');
const env=require('./environment')


// Telling passport to use new google strategy
passport.use(new googleStrategy({
    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_callback_url
    },
    function(accessToken,refreshToken,profile,done){
        // find a user

        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err)
            {
                console.log('error',err);
                return;
            }
            console.log(profile);
            if(user){
                // if found set this as req.user
                return done(null,user);
            }
            else{
                // if not create one
                // console.log("Hello")
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')

                },function(err,user){
                    if(err)
                    {
                        console.log('error in user creating',err);
                        return;
                    }
                    return done(null,user);
                })
            }
        })

    }


))
module.exports=passport;