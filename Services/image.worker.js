import 'dotenv/config'
import { Worker } from "bullmq";
import { User } from "../model/user.model.js";
import { redisClient } from "../config/redis.js";
import cloudinary from "../config/cloudinary.store.js";
import streamifier from "streamifier";
import { dbconn } from '../config/db.config.js';
import { UserImage } from '../model/user.image.js';
await dbconn();
const image_worker = new Worker(
    "add_image" , async(job) => {
        try{
        
             const { name, age, city, image } = job.data;
         
            const buffer = Buffer.from(image.buffer.data);  
    const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
        if (error) return reject(error);
        resolve(result);
        }
    );

    streamifier.createReadStream(buffer).pipe(stream);
    });

            // await User.create({...data})
  const user = await UserImage.create({
        name,
        age,
        city,
        image: uploadResult.secure_url
      });

     

        }catch(err){
            console.log("error in worker :", err)
            throw err;
        }
    },{
        connection: redisClient
    }
)

image_worker.on("completed",(job) => {
    console.log("job completed", job.id)
})

image_worker.on("failed" , (job , err) => {
    console.log("job failed", err)
})