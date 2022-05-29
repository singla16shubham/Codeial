const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
 const port=8001;




 const expressLayouts=require('express-ejs-layouts');
 const db=require('./config/mongoose');
const { urlencoded } = require('express');
 app.use(expressLayouts);
 app.use(urlencoded());
 app.use(cookieParser());

 app.use(express.static('./assets'));

//  extract styles and sublayouts in layout
app.set('layout extractStyles', true);
app.set('layout Scripts', true);

//  use express router
app.use('/',require('./routes'))

// Set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


 app.listen(port,function(err){
     if(err)
     {
         console.log("Error has Occurred",err);
     }
     console.log(`Server is running on ${port}`)
 })