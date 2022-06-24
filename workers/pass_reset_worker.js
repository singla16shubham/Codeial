const queue=require('../config/kue');
const resetpassMailer=require('../mailers/reset_pass_mailer');

queue.process('reset',function(job,done){
    console.log('Emails worker is Processing a job',job.data);
    resetpassMailer.resetPass(job.data);
    done();
    
    })