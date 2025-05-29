const path = require('path');
const baseConfig = require('../../packages/config/rspack.base');

const extraAliases = {
  '@checkout': path.resolve(__dirname, 'src'),
};

module.exports = baseConfig({ appDir: __dirname, port: 3032, extraAliases });
