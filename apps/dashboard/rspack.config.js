const path = require('node:path');
const baseConfig = require('../../packages/config/rspack.base');

const extraAliases = {
  '@dashboard': path.resolve(__dirname, 'src'),
};

module.exports = baseConfig({ appDir: __dirname, port: 3031, extraAliases, subdomain: 'dashboard' });
