const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
  try {
    const modelUrl = 'https://storage.googleapis.com/model-ml-agrisense/agrisense-model-main/model.json';
    const model = await tf.loadLayersModel(modelUrl);
    console.log('Model loaded successfully');
    return model;
} catch (error) {
    console.error('Error loading the model:', error);
    throw error;
}
}

module.exports = { loadModel };