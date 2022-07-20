require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.static("public"));
app.get("/public/img/:folderName/:fileName", async (req, res) => {
  const { folderName, fileName } = req.params;
  res.sendFile(
    path.join(__dirname, "public/img/" + folderName + "/" + fileName)
  );
});

routes.initialize(app);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
