const { buildConfig } = require('../../packages/utils/src/tailwind.config');

// Build the base config first
const baseConfig = buildConfig(__dirname);


module.exports = baseConfig;
