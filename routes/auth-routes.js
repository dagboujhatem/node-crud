const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Sign Up
router.post('/register', async (req, res) => {
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound == null) {
        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if (error) {
                res.status(500).json({ message: 'Server error!' });
            }
            req.body.password = hash;
            await User.create(req.body);
            res.json({ message: 'Registered successfully' });
        });
    } else {
        res.status(400).json({ message: 'E-mail Exist !' });
    }
});

//Sign In
router.post('/login', async (req, res) => {
    const loginUser = await User.findOne({ email: req.body.email });
    if (loginUser != null) {
        const validPassword = await bcrypt.compare(req.body.password, loginUser.password);
        if (validPassword) {
            const tokenData = {
                userId: loginUser._id,
            }
            const createdToken = jwt.sign(tokenData, 'token-secret', { expiresIn: '3d' });
            res.status(200).json({ message: 'Logged in successfully', token: createdToken });
        } else {
            res.status(400).json({ message: 'Please verify your E-mail or Password' });
        }
    } else {
        res.status(400).json({ message: 'Please verify your E-mail or Password' });
    }
})
// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logged out!' })
});

module.exports = router