const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
 const port=8001;

 const expressLayouts=require('express-ejs-layouts');
 const db=require('./config/mongoose');

//  Used for session cookie
 const session=require('express-session');
 const passport=require('passport');
 const passportLocal=require('./config/passport-local-strategy');
 
 const MongoStore=require('connect-mongo');

 const sassMiddleware=require('node-sass-middleware');
 const flash=require('connect-flash');
const customMware=require('./config/middleware');

const { urlencoded } = require('express');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
 app.use(expressLayouts);
 app.use(urlencoded());
 app.use(cookieParser());

 app.use(express.static('./assets'));
//  it will make the upload path available to browser
 app.use('/uploads',express.static(__dirname+ '/uploads'))

//  extract styles and sublayouts in layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//  use express router


// Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo stoe is used to store the session cookie in the db

app.use(session({
    name: 'codeial',
    // change secret before deploy
    secret: 'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
//  this
    store:MongoStore.create({mongoUrl:'mongodb://localhost/codeial_development',autoRemove:'disabled'},
        
    function(err)
    {
        console.log(err||"connect-mongo setup ok");
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);


app.use('/',require('./routes'))

 app.listen(port,function(err){
     if(err)
     {
         console.log("Error has Occurred",err);
     }
     console.log(`Server is running on ${port}`)
 })