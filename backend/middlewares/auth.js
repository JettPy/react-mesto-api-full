const jwt = require('jsonwebtoken');
const HttpError = require('../utils/HttpError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new HttpError(401, 'authError', 'Ошибка авторизации');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    throw new HttpError(401, 'authError', 'Ошибка авторизации');
  }
  req.user = payload;
  return next();
};

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     throw new HttpError(401, 'authError', 'Ошибка авторизации');
//   }
//   const token = authorization.replace('Bearer ', '');
//   let payload;
//   try {
//     payload = jwt.verify(token, 'dev-secret');
//   } catch (err) {
//     throw new HttpError(401, 'authError', 'Ошибка авторизации');
//   }
//   req.user = payload;
//   return next();
// };
