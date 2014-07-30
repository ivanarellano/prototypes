var Hapi = require('hapi');
var server = Hapi.createServer('localhost', process.env.PORT || 3000);

var routes = require('./routes')(Hapi);

server.route([{
  method: 'GET',
  path: '/vote/sms',
  handler: routes.voteSMS
}]);

server.start();