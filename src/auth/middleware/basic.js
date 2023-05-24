'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { 
    console.error(e);
    res.status(403).send('Invalid Login'); 
  }
  let basic = req.headers.authorization;
  let [username, pass] = base64.encode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(username, pass)
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
}
