const axios = require("axios")
const express = require("express")
const app = express()


const PORT = process.env.PORT || 1000 
app.use(express.json())

app.post("/proxy-one", (req, res) => {
    const newURL = req.body.url;
  
  const data = await axios.get(newURL).then(data => data.data)
  console.log(data)
  res.send(data)    
})

app.get("/proxy-one", (req, res) => {
    res.send("Proxy-one Running!")
})

app.listen(PORT)

