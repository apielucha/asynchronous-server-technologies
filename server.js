var user = require("./user.js");

module.exports = {

  port: 8080,
  ip: '10.0.2.15',
  
  logic: function(req, res) {
    var url = req.url;

    switch (url) {
      case '/user/show':
        user.show(res);
        break;
      case '/user/store':
        user.store(res);
        break;
      default:
        res.writeHead(400, { 'Content-Type': 'text/plain'});
        res.end('Error 404, page not found.');
    }
  }

};
