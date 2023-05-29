const path = require("path")
const { alias } = require("react-app-rewire-alias")

// module.exports = function override(config) {
//   alias({
//     "@services": "src/services",
//     "@components": "src/components",
//     "@utils": "src/helper",
//     "@layout": "src/layout",
//   })(config)

//   return config
// }

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      "@services/*": path.resolve(__dirname, "src/services/*"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils/*": path.resolve(__dirname, "src/helper/*"),
      "@layout/*": path.resolve(__dirname, "src/layout/*"),
    },
  }
  return config
}
