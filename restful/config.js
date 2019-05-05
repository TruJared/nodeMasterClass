//  *  class is a bit much but practice is good  *  //

class Environments {
  constructor(httpPort, httpsPort, envName) {
    return {
      httpPort,
      httpsPort,
      envName,
    };
  }
}

// set environments here
const environments = {
  staging: new Environments(3000, 3001, 'staging'),
  production: new Environments(5000, 5001, 'production'),
};

// did user pass a defined environment
const environmentToExport = (requestedEnv) => {
  if (environments.hasOwnProperty(requestedEnv)) {
    return environments[requestedEnv];
  }
  return environments.staging;
};

module.exports = environmentToExport;
