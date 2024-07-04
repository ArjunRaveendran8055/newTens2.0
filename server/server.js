const { connectMongoDb } = require("./Db/connectDB");
const { app } = require("./app");
const setupSocket = require("./routes/socket");

//unhandled exceptional errors
process.on("uncaughtException", (err) => {
  console.log(
    `Server shutting down due to unhandled exceptional error: ${err.message}`
  );
  process.exit(0);
});

//unhandled promise rejection errors
process.on("unhandledRejection", (err) => {
  console.log(
    `Server shutting down due to unHandled promise Rejection error: ${err.message}`
  );
  process.exit(0);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

//create express server
const createServer = async () => {
  //connection to mongoDb
  await connectMongoDb();
  const port = process.env.PORT;
  const server = app.listen(port, () => {
    console.log(`Server running at Port : ${port}`);
  });
  setupSocket(server)
};

createServer();
