const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

//IMPORTED ROUTES HERE
const itemsRouter = require('../items/items-router.js');
const clientsRouter = require('../clients/clients-router.js');
const servicesRouter = require('../services/services-router.js');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors());
server.use(helmet());

server.get('/', (req, res) => {
  res.json({"message": "Node.js/Express server with MongoDB is ready to go."});
});

//USE ROUTES HERE
server.use('/api/items', itemsRouter)
server.use('/api/clients', clientsRouter)
server.use('/api/services', servicesRouter)


module.exports = server;