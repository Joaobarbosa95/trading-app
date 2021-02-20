const express = require("express");
const app = require("express")();
const axios = require("axios");
const request = require("request");
app.use(express.json());

const PORT = process.env.PORT || 1000

app.post("/proxy", async (req, res) => {
  const newURL = req.body.url;
  
  const data = await axios.get(newURL).then(data => data.data)
  console.log(data)
  res.send(data)
});

app.get("/", async(req, res) => {
  res.send("Running")
})
app.listen(PORT, () => console.log("sever running on port " + PORT));
