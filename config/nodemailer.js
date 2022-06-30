const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');
let transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    // Here app password is Generated For sending the emails thorugh this email
    // Remember to remove it
    auth: {
      // have to set the credentials of the person by which mail needs to be sent
      user: 'abc@gmail.com', // generated ethereal user
      pass: '123' // generated ethereal password
    },
  });



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