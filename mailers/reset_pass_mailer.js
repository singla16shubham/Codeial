const nodeMailer=require('../config/nodemailer');

exports.resetPass= (token)=> {
    console.log('Inside new reset mail',token);
let htmlString=nodeMailer.renderTemplate({token: token},'/reset_password/reset_pass.ejs')

    nodeMailer.transporter.sendMail({
        from:'singla16shubham@gmail.com',
        to:token.user.email,
        subject:"Password reset Link",
        html:htmlString
    },(err,info)=>{
        if(err)
        {
            console.log("Error in sending mail",err);
            return;
        }
        console.log("Mail delivered",info);
        return;
    })
}