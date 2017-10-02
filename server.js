module.exports = {
  logic: function(req, res) {
    console.log(req.url);

    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('Hello World!');
  },

  port: 8080,
  ip: '10.0.2.15'
};
