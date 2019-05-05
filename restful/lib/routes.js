const Crud = require('./crud');
const { hash } = require('./helpers');
// handlers
const ohShit = (data, callback) => {
  callback(404);
};

const ping = (data, callback) => {
  callback(200);
};

// #region - crud functions

// #endregion

const router = {
  ping,
  ohShit,
  users,
};

module.exports = router;
