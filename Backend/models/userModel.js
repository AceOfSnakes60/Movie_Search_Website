import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require:[true, 'Please add a name']
    },
    email: {
        type: String,
        require:[true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        require:[true, 'Please add a password']
    }
},
{
    timestamps: true
})

const User = model('User', userSchema)

export default User;