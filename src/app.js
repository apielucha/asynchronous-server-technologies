var http = require("http");
var user = require("./user.js");
var server = {

  // IP Address of the server
  ip_address: '10.0.2.15',
  // Port listened by the server
  port: 8080,

  // Starts the server
  start: function() {
    http.createServer(this.routes).listen(this.port, this.ip_adress);
  },

  // Analyzes the HTTP request and routes to the corresponding method.
  // If no route matches, returns a 404 Error.
  routes: function(req, res) {
    var url = req.url;

    if (url == '/user/save') {
      user.save({
        first_name: 'Alexandre',
        last_name: 'Pielucha',
        birth_date: '1996-02-28'
      }, function(user) {
        server.print(res, 200, 'New user added: ' + JSON.stringify(user));
      });
    } else if ((/^\/user\/get\/[0-9]+$/i).test(url)) {    // url == '/user/get/{id}'
      user.get(url.match(/[0-9]+$/)[0], function(id) {
        server.print(res, 200, 'You requested user ' + id + '.');
      });
    } else {
      server.print(res, 404, 'Error 404, page not found.');
    }
  },

  // Returns an HTTP response containing a code and a message.
  print: function(res, http_code, message) {
    res.writeHead(http_code, { 'Content-Type': 'text/plain'});
    res.end(message);
  }

};

// Start the server
server.start();
