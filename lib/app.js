const net = require('net');
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');

const endpointHandlers = [];

const addHandler = (method, path, handler) => {
  if(!endpointHandlers[method]) endpointHandlers[method] = {};
  endpointHandlers[method][path] = handler;
};

const handleRequest = (request) => {
  const { method, path } = request;
  const methodList = endpointHandlers[method];
  const new404 = createResponse({ body: 'Not Found', status: '404 Not Found', contentType: 'text/plain' });
  if(!methodList) {
    //There are no handlers for this method, return a 404
    return new404;
  }
  const handler = methodList[path];
  if(handler) {
    //there's a handler for this method and path, return a response from it.
    return handler(request);
  }
  //there was no handler, return a 404
  return new404;
};

const app = net.createServer(socket => {

  addHandler('GET', '/', () => {
    return createResponse({
      body: 'hi',
    });
  });

  addHandler('POST', '/echo', (request) => {
    return createResponse({
      body: request.body
    });
  });

  addHandler('GET', '/red', () => {
    return createResponse({
      body: '<h1>red</h1>'
    });
  });
  
  addHandler('GET', '/green', () => {
    return createResponse({
      body: '<h1>green</h1>'
    });
  });
  
  addHandler('GET', '/blue', () => {
    return createResponse({
      body: '<h1>blue</h1>'
    });
  });
  
  socket.on('data', data => {
    const request = parseRequest(data.toString());
    const response = handleRequest(request);
    socket.end(response);
  });
});

module.exports = app;
