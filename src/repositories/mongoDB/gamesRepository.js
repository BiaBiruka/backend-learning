const { MongoClient, ObjectId } = require("mongodb");

async function handleInsert(client, gameName, gamePrice) {
  await client
    .db("backend-learning")
    .collection("games")
    .insertOne({ name: gameName, price: gamePrice });
}

async function handleSelectAll(client) {
  const res = await client
    .db("backend-learning")
    .collection("games")
    .find({})
    .toArray();
  return res;
}

async function handleSelectById(client, gameId) {
  const res = await client
    .db("backend-learning")
    .collection("games")
    .findOne({ _id: new ObjectId(gameId) });
  return res;
}

async function handleSelectByName(client, gameName) {
  const res = await client
    .db("backend-learning")
    .collection("games")
    .findOne({ name: gameName });
  return res;
}

async function handleDelete(client, gameId) {
  await client
    .db("backend-learning")
    .collection("games")
    .deleteOne({ _id: new ObjectId(gameId) });
}

async function handleUpdate(client, newPrice, gameId) {
  await client
    .db("backend-learning")
    .collection("games")
    .updateOne({ _id: new ObjectId(gameId) }, { $set: { price: newPrice } });
}

// async function handleInserAll(client) {
//   const { games } = require("../seed/gamesSeed.js");
//   await client.db("backend-learning").collection("games").insertMany(games);
// }
