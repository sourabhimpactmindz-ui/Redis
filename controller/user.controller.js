import { redisClient } from "../config/redis.js";
import { User } from "../model/user.model.js";

// export const CreateUser = async(req,res) => {
//     const { name , age ,  city} = req.body
//     try{

//         const exitsuser = await User.findOne({name})

//         if(exitsuser){
//             return res.status(400).json({message : "User already exits" , status : false})
//         }

//         const user = await User.create({
//             name,
//             age,
//             city
//         })

//         return res.status(200).json({message : "User created succesfully" , data : user , status : true})

//     }catch(err){
//         return res.status(500).json({message : err.message , status : false})
//     }
// }

// cache Aside

export const insertbulkProducts = async (req, res) => {
  try {
    const product = [];
    for (let i = 10001; i <= 100000; i++) {
      product.push({
        name: `userame-${i}`,
        age: Math.floor(Math.random() * 1000) + 1,
        city: `city -${i}`,
      });
    }
    const result = await User.insertMany(product);

    return res.status(201).json({
      message: "10000 products inserted successfully",
      totalInserted: result.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error inserting products",
    });
  }
};

export const UserFind = async (req, res) => {
  try {
    const cachekey = "all_users";

    const cachedata = await redisClient.get(cachekey);

    if (cachedata) {
      console.log("redis hit");
      return res.status(200).json({
        message: "fetched successfully",
        data: JSON.parse(cachedata),
        status: true,
      });
    }

    console.log("database hit");
    const user = await User.find().limit(5000);

    await redisClient.set(cachekey, JSON.stringify(user), "EX", 20);
    return res
      .status(200)
      .json({ message: "users fetched successully", data: user, status: true });
  } catch (err) {
    return res.status(500).json({ message: err.message, status: false });
  }
};

// Write Through
// export const CreateUser = async(req,res) => {
//     const {name , age , city} = req.body

//     try{
//         const exitsuser = await User.findOne({name})

//         if(exitsuser){
//             return res.status(400).json({message : "User already exists" , status :false})
//         }

//         const user = await User.create({
//             name,
//             age,
//             city
//         })

//         const cachekey = "all_user"

//         const existing = await redisClient.get(cachekey);
//         // console.log("cache before update",existing)

//         if(existing){
//             const users = JSON.parse(existing)
//             users.push(user)
//             await redisClient.set(cachekey , JSON.stringify(users))
//             // console.log("both updated successfully" , users)
//         } else {
//             // await redisClient.set(cachekey, JSON.stringify([user]));
//             // console.log("Cache created first time" , user);
//         }

//         return res.status(200).json({mesage : "user created successfully" , status : true , data : user})

//     }catch(err){
//         return res.status(500).json({message : err.message , status : false})
//     }
// }


// Write behind
export const CreateUser = async (req, res) => {
  const { name, age, city } = req.body;
  try {
    const cachekey = "all_users";
    
    const existing = await redisClient.get(cachekey);

    let users = [];

    if (existing) {
      users = JSON.parse(existing);
    }

    const newuser = { name, age, city };

    users.push(newuser);

    await redisClient.set(cachekey, JSON.stringify(users));

    res.status(200).json({
      message: "user added (cached updated instantly",
      status: true,
      data: newuser,
    });

    setTimeout(async () => {
      try {
        await User.create(newuser);
        console.log("DB updated (write-behind)");
      } catch (err) {
        console.log("DB error:", err.message);
      }
    }, 20000);
  } catch (err) {
    return res.status(500).json({ message: err.message, status: false });
  }
};
