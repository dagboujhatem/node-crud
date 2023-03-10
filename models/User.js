const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }    
},{
    timestamps: true,
    versionKey: false
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User