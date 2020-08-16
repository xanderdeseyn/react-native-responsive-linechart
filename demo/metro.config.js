/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// const path = require('path')

// const extraNodeModules = {
//   // 'react-native-responsive-linechart': path.resolve(__dirname + '/../src')
// }

// const watchFolders = [path.resolve(__dirname + '/../src')]

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: true,
//         inlineRequires: false,
//       },
//     }),
//   },
//   resolver: {
//     extraNodeModules: new Proxy(extraNodeModules, {
//       get: (target, name) =>
//         //redirects dependencies referenced from common/ to local node_modules
//         name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
//     }),
//   },
//   watchFolders,
// }
