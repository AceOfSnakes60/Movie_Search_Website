import express from 'express';

import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';



const router = express.Router();


//registration
router.post('/', async (req, res) => {
    try{
        const {name, email, password, favorites, comments} = req.body

        if (!name || !email || !password) {
            res.status(400).json({ message: 'Add all Fields' })
            throw new Error('add all Field')
        }

        if (await User.findOne({ email })) {
            res.status(409).json({ message: 'User already exists' });
            throw new Error('User already exists')
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

        if (user) {

            return res.status(200).json({
                email: user.email
            })
        }
        res.status(400)
        throw new Error('Invalid user data')


    } catch (err) {
        console.error(err);
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        const comparePassword = await bcrypt.compare(password, user.password)

        if (user && comparePassword) {
            return res.json({ message: 'Password match' });
        }
        res.status(400)
        throw new Error('User not found')


    } catch (err) {
        console.error(err);
    }
})

//users
router.get('/me', async (req, res) => {
    try {
        const id = req.body.id
        const { _id, name, email, } = await User.findById(id);


        res.status(200).json({
            id: _id,
            name: name,
            email: email,
        })
    } catch (err) {
        console.error(err)
    }
})


export default router;
