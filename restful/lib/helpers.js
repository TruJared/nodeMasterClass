const crypto = require('crypto');
const config = require('./config');

const hash = (str) => {
  if (typeof str === 'string' && str.length > 0) {
    const hashedPassword = crypto.createHmac(
      'sha256',
      config.hashingSecret.update(str).digest('hex'),
    );
    return hashedPassword;
  }
  return false;
};

module.exports = hash;
