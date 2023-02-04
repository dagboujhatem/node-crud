const passport = require('passport');
const jwt = require('jsonwebtoken');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/User');

passport.use(new BearerStrategy(
    (token, done)=> {
      const decodedData = jwt.verify(token, 'token-secret');
      // console.log(decodedData);
      User.findById(decodedData.userId, (err, user)=> {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });
    }
  ));