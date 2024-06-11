const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();

async function storeData(id, data) {
  const collection = db.collection('predictions');
  return collection.doc(id).set(data);
}

async function getPredictDataByUserId(userId) {
  const collection = db.collection('predictions');
  const snapshot = await collection.where('userId', '==', userId).get();
  const data = snapshot.docs.map((doc) => doc.data());
  return data;
}

async function getPredictDataById(id) {
  const collection = db.collection('predictions');
  const snapshot = await collection.doc(id).get();
  return snapshot.data();
}

module.exports = { storeData, getPredictDataByUserId, getPredictDataById};