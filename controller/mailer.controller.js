import { sendMail } from "../config/nodemailer.js";
import { User } from "../model/user.model.js";
import { Queue_mailer } from "../queue/Queue.mailer.js";

export const Createuser = async(req,res) => {
  const {name , age , city , email} = req.body;

  try{
    const userr = await Queue_mailer.add("send_mailer" , {
        name,
        city,
        age,
        email
    })


    
     res.status(201).json({
      success: true,
      message: "User created & mail sent",
      data : userr,
    });

  }catch(err){
    return res.status(500).json({message : err.message})
  }

}

// export const Createuser = async(req,res) => {
//   const {name , age , city , email} = req.body;

//   try{
//     const userr = await User.create({
//         name,
//         city,
//         age,
//         email
//     })

//     await sendMail({
//         to : email,
//        subject: "User Created Successfully 🎉",
//       message: `Hello ${name}, your account has been created successfully!`,
//     })
    
//      res.status(201).json({
//       success: true,
//       message: "User created & mail sent",
//       data : userr,
//     });

//   }catch(err){
//     return res.status(500).json({message : err.message})
//   }

// }