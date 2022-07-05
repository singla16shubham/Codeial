const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const { log } = require('util');


const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);
const accessLogStream=rfs.createStream('access.log',{
  interval: '1d',
  path: logDirectory
});
const development={
    name: 'development',
    asset_path: './assets',
    session_cookie_key:'something',
    db: 'codeial_development',
    smtp:{
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        // Here app password is Generated For sending the emails thorugh this email
        // Remember to remove it
        auth: {
          // have to set the credentials of the person by which mail nee
          user: 'singla16shubham@gmail.com', // generated ethereal user
          pass: 'kawdjdwphxztcmgl' // generated ethereal password
        },
      },
      google_client_id:'306064148042-rpo6g54ml5qg63dotsr2c68pf9t64dqf.apps.googleusercontent.com',
      google_client_secret:'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',
      google_callback_url:'http://localhost:8001/users/auth/google/callback',
      jwt_secret: 'codeial',
      morgan:{
        mode:'dev',
        options: {stream: accessLogStream}
      }
}
const production={
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIALSESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        // Here app password is Generated For sending the emails thorugh this email
        // Remember to remove it
        auth: {
          // have to set the credentials of the person by which mail nee
          user: process.env.CODEIAL_GMAIL_USERNAME, // generated ethereal user
          pass: process.env.CODEIAL_GMAIL_PASSWORD // generated ethereal password
        },
      },
      google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
      google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
      google_callback_url:process.env.CODEIAL_GOOGLE_CALLBACK_UR,
      jwt_secret: process.env.CODEIAL_JWT_SECRET,
      morgan:{
        mode:'combined',
        options: {stream: accessLogStream}
      }
}
// module.exports=development
module.exports=eval(process.env.CODEIAL_ENVIRONMENT)== undefined?developent:eval(process.env.CODEIAL_ENVIRONMENT);

// npm uninstall gulp-imagemin
// //Reinstall the old version
// npm install gulp-imagemin@6.0.0
// del.sync([‘./public/assets’], { force:true });
