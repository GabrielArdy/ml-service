const classPrediction = require('../services/inference');
const crypto = require('crypto');
const { storeData } = require('../services/storeData');
const { Firestore } = require('@google-cloud/firestore');

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

    
    const data = {
      id: id,
      result: label,
      confidences: `${confidences.toFixed(2)}%`,
      createdAt: createdAt,
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

async function getPredictHistories(req, res) {
  try {
    const db = new Firestore();
    const collection = db.collection('predictions');
    const snapshot = await collection.get();
    const data = snapshot.docs.map((doc) => doc.data());
    
    if(data.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No data available'
      });
    }
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

module.exports = { predict, getPredictHistories };
