const baseConfig = require("../../packages/config/webpack.base");

module.exports = baseConfig({ appDir: __dirname, port: 3032 });
