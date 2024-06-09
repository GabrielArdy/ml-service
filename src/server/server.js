const express = require('express');
const { loadModel } = require('../services/loadModel');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });
const save = multer({ dest: '../resources/image' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes'); // Pastikan path relatif benar
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

loadModel().then((model) => {
  app.locals.model = model;
  console.log('Model loaded successfully');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Error loading the model', error);
});
