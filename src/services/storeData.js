const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();

async function storeData(id, data) {
  const collection = db.collection('predictions');
  return collection.doc(id).set(data);
}

module.exports = { storeData };