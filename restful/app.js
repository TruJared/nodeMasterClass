const config = require('./lib/config');
const { httpServer, httpsServer } = require('./lib/server');

// #region -- test fake db
// const Crud = require('./lib/crud');
// // write //
// let myData =
// new Crud({ dir: 'test', file: 'newFile',
// data: { name: 'Jared' } }, err => console.log(`error ${err}`));
// myData.create();
// // read //
// myData = new Crud({ dir: 'test', file: 'newFile' }, (err, data) => {
//   console.log(`error: ${err}`);
//   console.log(`data: ${data}`);
// });
// myData.read();
// // update //
// myData =
//   new Crud({ dir: 'test', file: 'newFile',
//   data: { isCool: 'False' } }, err => console.log(`error: ${err}`));
// myData.update();
// // delete //
// myData = new Crud({ dir: 'test', file: 'newFile' }, (err) => {
//   console.log(`error: ${err}`);
// });
// myData.delete();
// #endregion

// get params
const requestedServer = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : '';
const serverInfo = config(requestedServer);

// fire it up 🔥 🔥 🔥
httpServer.listen(serverInfo.httpPort, () => console.log(
  `👎 The http server ${serverInfo.envName} is listening on port ${serverInfo.httpPort}`,
));

httpsServer.listen(serverInfo.httpsPort, () => console.log(
  `👍 The https server ${serverInfo.envName} is listening on port ${serverInfo.httpsPort}`,
));
