var server = require('./server');
var route = require('./route');
var requestHandle = require('./requestHandle');

var handle = {};
handle['/'] = requestHandle.start;
handle['/start'] = requestHandle.start;
handle['/upload'] = requestHandle.upload;
handle['/show'] = requestHandle.show;


server.start(route.route, handle);

