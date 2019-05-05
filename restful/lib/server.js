const http = require('http');
const https = require('https');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const fs = require('fs');
const router = require('./routes');

function hitDatServer(req, res) {
  // get url and parse it
  const parsedUrl = url.parse(req.url, true);
  // get path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  // convert query string to obj
  const queryStringObject = parsedUrl.query;
  // get method
  const method = req.method.toLowerCase();
  // get headers as object
  const { headers } = req;
  // if payload -> get payload
  const decoder = new StringDecoder('utf8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });
  // req.on('end', () => {
  //   buffer += decoder.end();
  // });
  // does path exist and what do we do now
  const handlerRequest = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : router.ohShit;
  // get data
  const data = {
    trimmedPath,
    headers,
    method,
    queryStringObject,
    userData: buffer,
  };
  // and run it through the router
  let responseCode = 200;
  let responsePayload = '';
  handlerRequest(data, (statusCode, payload) => {
    if (typeof statusCode === 'number') {
      responseCode = statusCode;
    }
    if (typeof payload === 'object') {
      responsePayload = JSON.stringify(payload);
    }
  });

  // return that response
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(responseCode);
  res.end(responsePayload);
  console.log(responseCode, responsePayload);
}

const httpServer = http.createServer((req, res) => {
  hitDatServer(req, res);
});

const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
};
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  hitDatServer(req, res);
});

module.exports = { httpServer, httpsServer };
