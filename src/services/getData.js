const { Firestore } = require('@google-cloud/firestore');

async function fetchPredictData() {
  const db = new Firestore();
  const collection = db.collection('predictions');
  const snapshot = await collection.get();
  const data = snapshot.docs.map((doc) => doc.data());
  
  if(data.length === 0) {
    return {
      status: 'error',
      message: 'No data available'
    }
  }
  return data;
}

module.exports = { fetchPredictData };
