const { mongoDbInstance } = require("./mongoConnection");
const { sqLiteDbConnection } = require("./sqLiteInstance");

const handleConnection = async () => {
  if (process.env.DATABASE === "sqlite") {
    return sqLiteDbConnection;
  } else if (process.env.DATABASE === "mongodb") {
    return await mongoDbInstance();
  }
};

module.exports = { handleConnection };
