require('dotenv').config();

// require the server model file
const Server = require('./models/server.model');

// create an instance of the server
const server = new Server();

// start the server
server.listen();