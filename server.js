var user = require("./src/user.js");

module.exports = {

  port: 8080,
  ip: '10.0.2.15',

  logic: function(req, res) {
    var url = req.url;

    if (url == '/user/save') {
      user.save({
        first_name: 'Alexandre',
        last_name: 'Pielucha',
        birth_date: '1996-02-28'
      }, function(user) {
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end('New user added: ' + JSON.stringify(user));
      });
    } else if ((/^\/user\/get\/[0-9]+$/i).test(url)) {
      user.get(url.match(/[0-9]+$/)[0], function(id) {
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end('You requested user ' + id + '.');
      });
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain'});
      res.end('Error 404, page not found.');
    }
  }

};
