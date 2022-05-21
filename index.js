const express=require('express');
const app=express();
 const port=8001;

 app.listen(port,function(err){
     if(err)
     {
         console.log("Error has Occurred",err);
     }
     console.log(`Server is running on ${port}`)
 })