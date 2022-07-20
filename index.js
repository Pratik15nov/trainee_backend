

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/routes");
const CONFIG = require("./config/config");
const port = process.env.PORT || 8080;

const mongoString =
  "mongodb+srv://" +
  CONFIG.mogno.MONGO_USERNAME +
  ":" +
  CONFIG.mogno.MONGO_PASSWORD +
  "@" +
  CONFIG.mogno.MONGO_HOST +
  "/" +
  CONFIG.mogno.MONGO_DBNAME; //process.env.DATABASE_URL;

  console.log('MongoDB String: ', mongoString)

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());

routes.initialize(app);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
