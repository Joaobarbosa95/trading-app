const express = require("express");
require("./mongoose/mongoose.js");
const User = require("./models/user.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/User", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log("Server Running on port " + port);
});
