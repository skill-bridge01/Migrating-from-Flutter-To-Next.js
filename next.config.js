const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

module.exports = withVanillaExtract({
  output: 'export',
  
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/signin',
        permanent: false, // or true if this is a permanent redirect
      },
    ]
  },
  // その他の設定...
});

