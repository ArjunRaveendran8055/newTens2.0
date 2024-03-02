const nodemailer=require("nodemailer")

const sendMail=async (options)=>{
    const transposter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.text
    }
    try {
        await transposter.sendMail(mailOptions)
    } catch (error) {
        console.log(`sendMail error is : ${error.message}`)
        next(error)
    }
}

module.exports={
    sendMail
}