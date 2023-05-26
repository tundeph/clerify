const { alias } = require("react-app-rewire-alias")

module.exports = function override(config) {
	alias({
		"@services": "src/services",
		"@components": "src/components",
		"@utils": "src/helper",
		"@layout": "src/layout",
	})(config)

	return config
}
