// gatsby-node.js

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        'react-native-svg': 'react-native-svg-web-transform'
      }
    }
  })
}
