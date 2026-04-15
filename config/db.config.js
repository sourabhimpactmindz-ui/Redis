import mongoose from "mongoose"

export const dbconn = async() =>{
    try{
        const mongconn = await mongoose.connect(process.env.MONGO_URI)
        if(mongconn){
            console.log("Database connected successfully")
        }else{
            console.log("Database not connected")
        }

    }catch(err){
        console.log({message : err.message})
    }
}