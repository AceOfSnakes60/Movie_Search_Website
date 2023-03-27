import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import dbURL from '../mongooDB_URL.js';


const router = express.Router();

const connectMongoose = async () => {
    try {
        await mongoose.connect(dbURL)
        console.log('Connect with mongooseDB')
    } catch (error) {
        console.error(error);
    }
}

connectMongoose()


//registration
router.post('/', async (req, res) => {
    try{
        const {name, email, password, favorites, comments} = req.body

        if(!name || !email || !password) {
            res.status(400)
            throw new Error ('add all Field')
        }

        const userExists = await User.findOne({email});

        if(userExists){
            res.status(400)
            throw new Error('User alredy exists')
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            favorites,
            comments,
        })

        if(user) {
            res.status(200).json({
                email: user.email
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }

    }catch(err){
        console.log(err)
    }
})

//login
router.post('/login', async (req, res) => {
    try{
        const {email, password} =req.body
        
        const user = await User.findOne({email});
        const comperePassword = await bcrypt.compare(password, user.password)

        if(user && comperePassword) {
            res.json({message: 'Password match'})
        }else{
            res.status(400)
            throw new Error('User not found')
        }

    }catch(err){
        console.log(err)
    }
})

//users
router.get('/me', async (req, res) => {
    try {
        const id = req.body.id
        const {_id ,name, email,} = await User.findById(id);
        

        res.status(200).json({
            id: _id,
            name: name,
            email: email,
        })
    } catch (err) {
        console.log(err)
    }
})


export default router;
