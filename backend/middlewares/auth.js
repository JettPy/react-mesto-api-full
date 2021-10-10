const jwt = require('jsonwebtoken');
const HttpError = require('../utils/HttpError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new HttpError(401, 'authError', 'Ошибка авторизации');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new HttpError(401, 'authError', 'Ошибка авторизации');
  }
  req.user = payload;
  return next();
};
