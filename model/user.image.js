import mongoose from "mongoose"


const UserSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true
    },

    age : {
        type : Number,
        trim : true
    },

    city : {
        type : String,
        trim : true
    },

    image : {
        
    }

})

export const UserImage = mongoose.model("UserImage" , UserSchema)