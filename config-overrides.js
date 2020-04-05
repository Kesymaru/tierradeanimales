const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {

  alias({
    example: 'example/src',
    '@library': 'library/src',
  })(config)

  return config
}