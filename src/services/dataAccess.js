const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();

async function storeData(id, data) {
  const collection = db.collection('predictions');
  return collection.doc(id).set(data);
}

async function getPredictData(userId) {
  const collection = db.collection('predictions');
  const snapshot = await collection.where('userId', '==', userId).get();
  const data = snapshot.docs.map((doc) => doc.data());
  return data;
}

module.exports = { storeData, getPredictData };