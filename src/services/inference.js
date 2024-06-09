const tf = require('@tensorflow/tfjs-node');

async function classPrediction(model, imageBuffer) {
  try {
    const tensor = tf.node
      .decodeJpeg(imageBuffer, 3)
      .resizeNearestNeighbor([160, 160])
      .toFloat()
      .div(tf.scalar(127.5))
      .sub(tf.scalar(1));

    const prediction = model.predict(tensor.expandDims());
    const scores = await prediction.data();

    const confidences = Math.max(...scores) * 100;
    const classes = ['raw', 'ripe'];
    const predictedClassIndex = tf.argMax(prediction, 1).dataSync()[0];
    
    const result = {
      class: classes[predictedClassIndex],
      index: predictedClassIndex,
      scores: scores,
      confidence: confidences
    };

    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = classPrediction;
