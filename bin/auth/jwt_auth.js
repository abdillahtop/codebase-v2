
const jwt = require('jsonwebtoken');
const validate = require('validate.js');
const fs = require('fs')
const config = require('../infra/configs/global_config')
const wrapper = require('../helpers/utils/wrapper');
const getKey = fs.readFileSync(config.get('/privateKey'), 'utf8');
const getPublicKey = fs.readFileSync(config.get('/publicKey'), 'utf8');

const generateToken = async (payload) => {
  const privateKey = getKey;
  const verifyOptions = {
    algorithm: 'RS256',
    audience: '97b33193-43ff-4e58-9124-b3a9b9f72c34',
    issuer: 'hijrahdev',
    expiresIn: '10000d'
  };
  const token = jwt.sign(payload, privateKey, verifyOptions);
  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const result = {
    data: null
  };
  const publicKey = getPublicKey;
  const verifyOptions = {
    algorithm: 'RS256',
    audience: '97b33193-43ff-4e58-9124-b3a9b9f72c34',
    issuer: 'hijrahdev'
  };

  const token = getToken(req.headers);
  if (!token) {
    return wrapper.response(res, 'fail', result, 'Invalid token!', 401);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, publicKey, verifyOptions);
    req.token = decodedToken;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return wrapper.response(res, 'fail', result, 'Access token expired!', 401);
    }
    return wrapper.response(res, 'fail', result, 'Token is not valid!', 401);
  }
};

module.exports = {
  generateToken,
  verifyToken
};
