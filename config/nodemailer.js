const nodemailer=require('nodemailer');
const path=require('path');
const env=require('./environment')
const ejs=require('ejs');
let transporter = nodemailer.createTransport(env.smtp);



  let renderTemplate= (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template)
        {
            if(err)
            {
                console.log("Error in rendering",err);
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
   
    
  }

  module.exports={
    transporter: transporter,
    renderTemplate: renderTemplate
  }