const { handleFetchSqliteInstance } = require("./sqliteConnection");
const { handleFetchMongoInstance } = require("./mongoConnection");

// Returns the correct repository
const handleFetchDatabase = async () => {
  try {
    if (process.env.DATABASE === "sqlite") {
      return handleFetchSqliteInstance();
    } else if (process.env.DATABASE === "mongodb") {
      return await handleFetchMongoInstance();
    }
  } catch (err) {
    console.error("Failed to connect to database", err);
  }
};

module.exports = { handleFetchDatabase };
