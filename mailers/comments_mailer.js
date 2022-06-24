const nodeMailer=require('../config/nodemailer');

// it is same As writing let newcomment={}   Module.exports= newcomment
exports.newComment= (comment)=> {
    console.log('Inside new comment mail',comment);
let htmlString=nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:'singla16shubham@gmail.com',
        to:comment.user.email,
        subject:"New comment Published",
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