module.exports.home=function(req,res){
    console.log(res.cookie);
    // Altering the cookie which is set in browser
    // res.cookie('user_id',25);
    return res.render('home',{
        title:"Home"
    });
}