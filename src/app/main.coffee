fs = require 'fs'
http = require 'http'
pug = require 'pug'
stylus = require 'stylus'
url = require 'url'
user = require './user'

# Used to render a public resource (html & css)
renderResource = (type, filename, res) ->
  if type == 'html'
    # pug rendering
    pug.renderFile "src/templates/#{filename}.pug",
      pretty: true
    , (err, html) ->
      throw err if err
      res.writeHead 200,
        'Content-Type': 'text/html'
      res.write html
      res.end()

  else if type == 'css'
    # css => stylus
    stylus.render fs.readFileSync("src/assets/#{filename}.styl", 'utf8'),
      {}
    , (err, css) ->
      throw err if err
      res.writeHead 200,
        'Content-Type': 'text/css'
      res.write css
      res.end()

server =
  # IP Address of the server
  ip_address: '10.0.2.15'
  # Port listened by the server
  port: 8080

  # Starts the server
  start: () ->
    http.createServer(this.routes).listen(this.port, this.ip_adress)

  # Analyzes the HTTP request and routes to the corresponding method.
  # If no route matches, returns a 404 Error.
  routes: (req, res) ->
    url = url.parse req.url
    [ _, directory, type, filename ] = url.pathname.split '/'

    if !directory? || directory==''
      directory = '/'

    # console.log directory, type, filename

    switch directory
      when '/'
        # fs.readFile 'public/html/index.html'
        renderResource 'html', 'index', res
      when 'public'
        renderResource type, filename, res
      when 'user'
        server.print res, 200, 'Ok.'
      else
        server.print res, 404, 'HTTP 404: Route not found...\n'

  # Returns an HTTP response containing a code and a message.
  print: (res, http_code, message) ->
    res.writeHead http_code,
      'Content-Type': 'text/plain'
    res.end message

# Start the server
server.start()
