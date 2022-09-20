const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const DB_URL =
  "mongodb+srv://gembul:gemagembul@cluster0.aur8v.mongodb.net/restfulapi-pagination?retryWrites=true&w=majority";
const User = require("./models/User");
mongoose.connect(
  DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongodb");
  }
);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  let { page, limit, sort, asc } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 20;
  const skip = (page - 1) * limit;
  const users = await User.find()
    .sort({ [sort]: asc })
    .skip(skip)
    .limit(limit);
  res.send({ page: page, limit: limit, data: users });
});

app.listen(3500, () => {
  console.log("Server is Running on port 3500");
});
