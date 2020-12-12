module.exports = require('nconf').argv().env().file({
  file: __dirname + '/../config.json'
}).defaults({
  divvy: {
    host: 'one.vld.xdv.io',
    port: 51255,
    timeout: 10000
  },
})