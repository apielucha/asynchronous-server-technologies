module.exports = {

  logic: function(req, res) {
    var url = req.url;

    switch (url) {
      case '/admin':
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end('This is the admin page.');
        break;
      case '/public':
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end('This is the public page.');
        break;
      default:
        res.writeHead(400, { 'Content-Type': 'text/plain'});
        res.end('Error 404, page not found.');
    }
  },

  port: 8080,
  ip: '10.0.2.15'

};
