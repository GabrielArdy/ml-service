const classPrediction = require('../services/inference');

async function predict(req, res) {
  try {
    const imageBuffer = req.file.buffer;
    const model = req.app.locals.model;
    const result = await classPrediction(model, imageBuffer);
    
    const data = {
      result
    };

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

module.exports = { predict };
