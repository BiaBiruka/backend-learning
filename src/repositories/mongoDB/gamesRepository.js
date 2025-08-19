const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://backend-learning:nNucycs12ZtT8pSd@backend-learning.vbv3htr.mongodb.net/?retryWrites=true&w=majority&appName=backend-learning";

  const client = new MongoClient(uri);

  await client.connect();

  await client.close();
}

main().catch(console.error);
