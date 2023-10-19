import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require:[true, 'Please add a name']
    },
    lastName: {
        type: String,
        require:[true, 'Please add a last name']
    },
    email: {
        type: String,
        require:[true, 'Please add an email'],
        unique: true
    },
    phone: {
        type: String,
        require:[true, 'Please add a phone'],
    },
    birthday: {
        type: String,
        require:[true, 'Please add a birthday'],
    },
    password: {
        type: String,
        require:[true, 'Please add a password']
    },
    gener: {
        type: Array,
        require: true
    },
    favorites: {
        type: Array,
        require: true
    },
    comments: {
        type: Array,
        require: true
    }
},
{
    timestamps: true
})

const User = model('User', userSchema)

export default User;