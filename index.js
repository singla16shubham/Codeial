const express=require('express');
const env=require('./config/environment');
const logger=require('morgan');
const cookieParser=require('cookie-parser');

const app=express();
 const port=8001;
 require('./config/view-helper')(app);

 const expressLayouts=require('express-ejs-layouts');
 const db=require('./config/mongoose');

//  Used for session cookie
 const session=require('express-session');
 const passport=require('passport');
 const passportLocal=require('./config/passport-local-strategy');
 const passportJWT=require('./config/passport-jwt-strategy');
 const googlePassport=require('./config/passport-google-oauth2-strategy');
 
 const MongoStore=require('connect-mongo');

 const sassMiddleware=require('node-sass-middleware');
 const flash=require('connect-flash');
const customMware=require('./config/middleware');
// setup chatserver to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path=require('path')

const { urlencoded } = require('express');
// console.log("directory",__dirname);
console.log(env.name);
if(env.name=='development')
{
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, "scss"),
    dest:path.join(__dirname, env.asset_path, "css"),
    
    // src:'./assets/scss',
    // dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
}
// var x = path.join(__dirname,env.asset_path,'/css')

// console.log(x);
 app.use(expressLayouts);
 app.use(urlencoded());
 app.use(cookieParser());

 app.use(express.static(env.asset_path));
//  it will make the upload path available to browser
 app.use('/uploads',express.static(__dirname+ '/uploads'))
app.use(logger(env.morgan.mode,env.morgan.options))
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
    secret: env.session_cookie_key,
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