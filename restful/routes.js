const handlers = {};

handlers.ohShit = (data, callback) => {
  callback(404);
};

handlers.ping = (data, callback) => {
  callback(200);
};

const router = {
  ping: handlers.ping,
  ohShit: handlers.ohShit,
};

module.exports = router;
