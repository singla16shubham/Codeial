const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
 const port=8001;

 const expressLayouts=require('express-ejs-layouts');
 const db=require('./config/mongoose');

//  Used for session cookie
 const session=require('express-session');
 const passport=require('passport');
 const passportLocal=require('./config/passport-local-strategy')



const { urlencoded } = require('express');
 app.use(expressLayouts);
 app.use(urlencoded());
 app.use(cookieParser());

 app.use(express.static('./assets'));

//  extract styles and sublayouts in layout
app.set('layout extractStyles', true);
app.set('layout Scripts', true);

//  use express router


// Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name: 'codeial',
    // change secret before deploy
    secret: 'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/',require('./routes'))

 app.listen(port,function(err){
     if(err)
     {
         console.log("Error has Occurred",err);
     }
     console.log(`Server is running on ${port}`)
 })