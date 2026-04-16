import { UserImage } from "../model/user.image.js";
import { userImage } from "../queue/image.queue.js";


// export const CreateUserImage = async(req,res) => {
//     const { name , age , city } = req.body;

//     try{
//         const imageurl = req.file ? req.file.path : null;
   

//         const user = await UserImage.create({
//             name,
//             age,
//             city,
//             image : imageurl
//         })

//         return res.status(200).json({message : "user and image uploaded successfully" , status : true , data : user})


//     }catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             message: err.message,
//             status: false
//         });
//     }
// }

export const CreateUserImage = async(req,res) => {
    const {name , age , city} = req.body

    try{ 
        const file = req.file.buffer;
        const filename = req.originalname
        const image  ={
            name:filename,
            buffer:file
        }
        const userimage = await userImage.add("Image_upload",{
            name,
            city,
            age,image
         
        })
        return res.status(201).json({
            message : "user and image uploaded successfully",
            
            status : true
        })

    }catch(err){
        return res.status(500).json({message : err.message , status : false})
    }
}