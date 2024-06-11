const express = require('express');
const { loadModel } = require('../services/loadModel');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

loadModel().then((model) => {
  app.locals.model = model;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Error loading the model', error);
});
