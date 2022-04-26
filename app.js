if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routing
app.use(routes);

//mongoose & listener
mongoose
  .connect(
    'mongodb://pintaptest:pintaptest@cluster0-shard-00-00.hr3rh.mongodb.net:27017,cluster0-shard-00-01.hr3rh.mongodb.net:27017,cluster0-shard-00-02.hr3rh.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-113sjq-shard-0&authSource=admin&retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('mongoose connected');
    server.listen(PORT, () => {
      console.log('server connected at localhost:', PORT);
    });
  })
  .catch((e) => console.log(e));

module.exports = app;
