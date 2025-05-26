const baseConfig = require('../../packages/config/rspack.base');

module.exports = baseConfig({ appDir: __dirname, port: 3032, mode: 'production' });
