const fs = require('fs');
const path = require('path');

let config = {
  https: {
    sslCaBundleCrt: path.join(__dirname, './../fixtures/ca-bundle.crt'),
    sslKeyFile: path.join(__dirname, './../fixtures/server.key'),
    sslCertFile: path.join(__dirname, './../fixtures/server.crt'),
    port: 0
  },
  authentication: {
    jsonwebtoken: {
      secret: 'secret'
    },
    ltioptions: {
      passreqtocallback: true,
      consumerkey: 'key',
      consumersecret: 'secret'
    }
  }
};

let configFilename = path.join(__dirname, '../server/config/test.json5');
if (!fs.existsSync(configFilename)) {
  fs.writeFileSync(configFilename, JSON.stringify(config));
}
