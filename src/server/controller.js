const classPrediction = require('../services/inference');
const crypto = require('crypto');
const { storeData, getPredictDataByUserId, getPredictDataById } = require('../services/dataAccess');

async function predict(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Image file is required'
      });
    }
    const imageBuffer = req.file.buffer;
    const model = req.app.locals.model;
    const { label, confidences } = await classPrediction(model, imageBuffer);

    const id = crypto.randomBytes(16).toString('hex');
    const createdAt = new Date().toISOString();

    const dummyUserId = ['user1', 'user2', 'user3', 'user4', 'user5']; // dummy user id
    const userId = dummyUserId[Math.floor(Math.random() * dummyUserId.length)];

    
    const data = {
      id: id,
      result: label,
      confidences: `${confidences.toFixed(2)}%`,
      createdAt: createdAt,
      userId: userId,
      message: confidences > 90 ? 'High confidence' : 'Low confidence'
    };

    await storeData(id, data);

    res.status(200).json({
      status: 'success',
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}

async function getPredictHistoriesByUserId(req, res) {
  try {
    userId = req.query.userId;
    const data = await getPredictDataByUserId(userId);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}

async function getPredictById(req, res) {
  try {
    const id = req.params.id;
    const data = await getPredictDataById(id);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}

module.exports = { predict, getPredictHistoriesByUserId, getPredictById };
