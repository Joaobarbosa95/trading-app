const axios = require("axios")
const express = require("express")
const app = express()


const PORT = process.env.PORT || 1000 
app.use(express.json())

app.post("/proxy-two", async (req, res) => {
    const newURL = req.body.url;
  
  const data = await axios.get(newURL).then(data => data.data)
  res.send(data)    
})

app.get("/proxy-two", (req, res) => {
    res.send("Proxy-two Running!")
})

app.listen(PORT)

