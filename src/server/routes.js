const { predict, getPredictHistories } = require('./controller');
const routes = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

routes.post('/predict', upload.single('image'), predict);

routes.get('/predict/history', getPredictHistories);

module.exports = routes;
