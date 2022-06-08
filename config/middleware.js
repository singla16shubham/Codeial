// this middleware is used to pass the flash message to the res

module.exports.setFlash=function(req,res,next)
{
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    
    }
    next();
}