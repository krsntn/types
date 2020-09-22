/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@scss': path.resolve(__dirname, 'src/scss'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
