module.exports = {

  show: function(res) {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('Here is the user X.');
  },
  store: function(res) {
    res.writeHead(200, { 'Content-Type': 'text/plain'});
    res.end('New user added.');
  }
  
};
