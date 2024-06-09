const tf = require('@tensorflow/tfjs-node');

async function classPrediction(model, imageBuffer) {
  try {
    // Decode image and preprocess
    const tensor = tf.node
      .decodeJpeg(imageBuffer, 3)
      .resizeNearestNeighbor([160, 160])
      .expandDims()
      .toFloat()
      .div(tf.scalar(255)); // Normalizing the image

    // Make predictions using the layers model
    const prediction = model.predict(tensor);
    const scores = await prediction.data();

    // Get the highest confidence score and corresponding class
    const confidences = Math.max(...scores) * 100;
    const classes = ['raw', 'ripe'];

    const predictedClassIndex = scores.indexOf(Math.max(...scores));
    const result = {
      class: classes[predictedClassIndex],
      confidence: confidences
    };

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = classPrediction;
