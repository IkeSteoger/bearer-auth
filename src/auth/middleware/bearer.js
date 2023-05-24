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

// demo code changes - didnt seem to work better
// module.exports = async (req, res, next) => {
//   if (!req.headers.authorization) { 
//     next('Not authorized, no token present');
//   } else {
//     try {
//       let authType = req.headers.authorization.split(' ')[0];

//       if(authType === 'Bearer'){
//         const token = req.headers.authorization.split(' ')[1];
//         // console.log('token: ', token);
//         const validUser = await users.authenticateToken(token);
//         if(validUser){
//           req.user = validUser;
//           req.token = validUser.token;
//           next();
//         } else {
//           next('send token in a bearer auth string!');
//         }
//       }
//     } catch (e) {
//       console.error(e);
//       res.status(403).send('Invalid Login');
//     }
//   }
// }