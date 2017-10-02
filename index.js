var http = require("http");
var server = require("./server.js");

http.createServer(server.logic).listen(server.port, server.ip);
