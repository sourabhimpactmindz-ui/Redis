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
    }

})

export const User = mongoose.model("User" , UserSchema)