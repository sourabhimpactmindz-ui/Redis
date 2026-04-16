import { v2 as cloudinary } from "cloudinary";

import "dotenv/config"

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME || "dmlffpxbl",
    api_key : process.env.API_KEY || "747849828616747",
    api_secret :process.env.API_SECRET ||"ulMfRl8PBY7cRUu08Zm1U1nxaFI"
})

export default cloudinary;