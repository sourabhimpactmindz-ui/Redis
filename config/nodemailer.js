import nodemailer from 'nodemailer';

export const sendMail = async({to , subject  , message}) => {
    const transpoter = nodemailer.createTransport({
        host:process.env.Host || "smtp.gmail.com",
        port :process.env.Mailer_PORT || 587,
        secure : false,

        auth : {
            user :process.env.User ||"sourabh.impactmindz@gmail.com",
            pass :process.env.Pass ||"asjxqspbjzuuzxjv"
        }
    })

    await transpoter.sendMail({
        from :process.env.User,
        to,
        subject
     
    })
}
