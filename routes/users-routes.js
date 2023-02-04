const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');
const passport = require('passport')

// User authentificaated profile 
router.get('/profile', passport.authenticate('bearer', { session: false }), async (req, res) => {
    res.json(req.user)
})

// get all users
router.get('/', passport.authenticate('bearer', { session: false }), async (req, res) => {
    const users = await User.find();
    res.json(users);
});


router.get('/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    const userId = await User.findById(req.params.id);
    res.json(userId);
});

router.post('/', passport.authenticate('bearer', { session: false }), async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound == null) {
        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if (error) {
                res.status(500).json({ message: 'Server error!' });
            }
            req.body.password = hash;
            await User.create(req.body);
            res.json({ message: 'User created successfully' });
        });
    } else {
        res.status(400).json({ message: 'E-mail Exist !' });
    }
});

router.put('/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    const findUser = await User.findById(req.params.id);
    if(findUser=== null){
        res.status(400).json({ message: 'User not exist !' });
    }else{
        if(req.body.password !== ""){
            bcrypt.hash(req.body.password, 10, async (error, hash) => {
                if (error) {
                    res.status(500).json({ message: 'Server error!' });
                }
                req.body.password = hash;
                const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
                res.json({ message: 'User updated successfully', updatedUser });
            });
        }else{
            delete req.body.password;
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
            res.json({ message: 'User updated successfully', updatedUser});
        }
    }
})

router.delete('/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfuly' });
});

module.exports = router