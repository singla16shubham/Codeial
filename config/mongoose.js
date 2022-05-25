const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');

const db=mongoose.connection;
db.on('error',console.error.bind(console,"error in connecting to db"));

db.once('open',function(){
    console.log("Connected to Database");
})

module.exports=db;