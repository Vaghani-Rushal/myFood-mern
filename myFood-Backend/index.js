require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

const connectDb = require("./utils/db");

app.use(cors());
app.use(express.json());

const itemRouter = require("./router/item-router");
app.use("/api/", itemRouter);

const userRouter = require("./router/user-router");
app.use("/api/", userRouter);

connectDb().then(() => {
  app.listen(port, () => {
    console.log("Server Is runnng At port : ", port);
  });
});
