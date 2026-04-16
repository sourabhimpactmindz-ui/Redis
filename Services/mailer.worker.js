import { redisClient } from "../config/redis.js"
import { sendMail } from "../config/nodemailer.js";
import { dbconn } from "../config/db.config.js";
import { Worker } from "bullmq";
import { User } from "../model/user.model.js";

await dbconn();
const mail_worker = new Worker(
    "send_mail" , async(job) => {
        try{
            const data = job.data;
            const{email,name} =data;
                await sendMail({
        to : email,
       subject: "User Created Successfully 🎉",
      message: `Hello ${name}, your account has been created successfully!`,
    })

            await User.create({...data})


        }catch(error) {
            console.log("error in worker :" , error)
            throw error;
        }
    },
    {
        connection: redisClient
    }
)

mail_worker.on("completed",(job) => {
    console.log("job completed", job.id)
})

mail_worker.on("failed" , (job , err) => {
    console.log("job failed", err)
})