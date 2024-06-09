const { predict } = require('./controller');
const routes = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

routes.post('/predict', upload.single('image'), predict);

module.exports = routes;
