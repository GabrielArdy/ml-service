const { predict, getPredictHistoriesByUserId, getPredictById } = require('./controller');
const routes = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

routes.post('/api/predict', upload.single('image'), predict);
routes.get('/api/history', getPredictHistoriesByUserId);
routes.get('/api/history/:id', getPredictById);

module.exports = routes;
