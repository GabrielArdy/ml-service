const tf = require('@tensorflow/tfjs-node');

async function classPrediction(model, imageBuffer) {
  try {
    const tensor = tf.node
      .decodeJpeg(imageBuffer, 3)
      .resizeNearestNeighbor([160, 160])
      .toFloat()
      .div(tf.scalar(127.5))
      .sub(tf.scalar(1))
      .expandDims();

    const prediction = model.predict(tensor);
    const scores = await prediction.data();

    const confidences = Math.max(...scores) * 100;
    const classes = ['Raw', 'Ripe'];
    const predictedClassIndex = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[predictedClassIndex];

    return { label, confidences };
  } catch (error) {
    throw error;
  }
}

module.exports = classPrediction;
