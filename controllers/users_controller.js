const User = require('../models/user')

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
module.exports.update =  function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            return res.redirect('back');
        });
    }
    else {
        // status have different codes 200 for success and other status can be searched also
        return res.status(401).send('Unauthorised');
    }

}


// We are adding action
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | SignUp'
    });
}

module.exports.signIn = function (req, res) {
    // Doing this will ensure that user does not go to sign-in page unless sign out
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
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
module.exports.create_session = function (req, res) {

    return res.redirect('/')
}
module.exports.destroy_session = async function (req, res) {
    try {
        await req.logout(
            res.redirect('/'))

    }
    catch (err) {
        console.log("error", err);

    }
}

