var http = require("http");
var url = require("url");
var os = require("os");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.on('end', function() {
        console.log('Server disconnected');
    });

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(os.hostname() + "\n" + os.type() + "\n" + os.platform());

    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;