const requestHandler = require('../server/server');

module.exports = (req, res) => {
  return requestHandler(req, res);
};
