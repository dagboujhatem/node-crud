const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
// connect to database
require('./db/connect')
// passport config
const passport = require('passport')
require('./config/passport-setup')

// bring body parser 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// bring passport 
app.use(passport.initialize())

// Welcome route
app.get('/', (req,res)=> {
    res.json({message: 'Welcome to my app.'})
})

// bring auth routes
const auth = require('./routes/auth-routes')
app.use('/auth', auth)

// bring user routes
const users = require('./routes/users-routes')
app.use('/users', users)

// for other routes
app.get('*', (req,res)=> {
    res.json({message: 'Route not correct, please verify again.'})
})

// listen to port 3000
const port = 3000
app.listen(port, ()=> {
    console.log('App is wokring on port 3000')
})