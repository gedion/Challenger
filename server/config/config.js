const convict = require('convict');
const path = require('path');
const fs = require('fs');

var conf = convict({
  env: {
    format: ['development', 'test', 'production', 'scratch'],
    default: 'development',
    env: 'NODE_ENV'
  },
  https: {
    port: {
      default: 0,
      format: 'port',
      env: 'PORT'
    },
    sslCaBundleCrt: '',
    sslKeyFile: '',
    sslCertFile: '',
    sslOptions: {
      default: {},
      format: Object
    }
  },
  authentication: {
    jsonwebtoken: {
      secret: '',
      expiresIn: 3600
    }
  },
  ui: {
    settings: {
      'title': 'Hello World'
    }
  }
});

const env = conf.get('env');
conf.loadFile(path.join(__dirname, env + '.json5'));

if (process.env.EXTRA_CONFIG) {
  conf.loadFile(process.env.EXTRA_CONFIG.split(','));
}

const ca = [];
let chain = fs.readFileSync(conf.get('https.sslCaBundleCrt'), 'utf8');
chain = chain.split('\n');

let cert = [];

for (let i = 0, len = chain.length; i < len; i++) {
  let line = chain[i];
  if (!(line.length !== 0)) {
    continue;
  }
  cert.push(line);
  if (line.match(/-END CERTIFICATE-/)) {
    ca.push(cert.join('\n'));
    cert = [];
  }
}
conf.set('https.sslOptions', {
  ca: ca,
  key: fs.readFileSync(conf.get('https.sslKeyFile')),
  cert: fs.readFileSync(conf.get('https.sslCertFile'))
});

conf.validate({allowed: 'strict'});
module.exports = conf;
