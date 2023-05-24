'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);
    
    if(validUser){
      req.user = validUser;
      req.token = validUser.token;
      next();
    } else {
      next('send token in a bearer auth string!')
    }

  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}