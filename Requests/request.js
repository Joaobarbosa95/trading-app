const mongoose = require("mongoose");
const request = require("request");
const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.json());
const fetch = require("node-fetch");
const HttpsProxyAgent = require("https-proxy-agent");

const infoRequest = async function (url2, stockSymbol) {
  // const proxyAgent = HttpsProxyAgent("http://113.120.61.189:43644");
  // const response = await fetch(url, { agent: proxyAgent });

  // const body = await response.text;

  // INFO REQUEST
  // request({ url, json: true }, async (error, { body }) => {
    const response = await axios.post("https://yagura-proxy-server.herokuapp.com/proxy",  { url: url2 }  )
    let data = await response.data;

    // ERROR HANDLING
    if (Object.keys(data).includes("Note"))
      console.log(stockSymbol + " EXCESSIVE REQUEST");
    // if (error) console.log("UNABLE TO FETCH DATA FROM SOURCE: ", error);

    try {
      // DESTRUCTURING 1ST PHASE
      const minuteInfo = Object.entries(data["Time Series (1min)"]);
      const tradeDay = minuteInfo[0][0].slice(0, 10);

      // DINAMIC DATABASE CONNECTION
      const stockConnection = mongoose.createConnection(
        `mongodb://127.0.0.1:27017/${stockSymbol}`,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        }
      );

      // DYNAMIC MODEL STRUCTURE
      const Day = stockConnection.model(
        `/${stockSymbol}`, // days will become stock name
        {
          minute: String,
          open: String,
          high: String,
          low: String,
          close: String,
          volume: String,
        },
        `${tradeDay}`
      );

      // INFO DESTRUCTURING 2nd PHASE
      let array = [];
      for (let i = 0; i < minuteInfo.length; i++) {
        const minute = minuteInfo[i][0].slice(11);

        // body destructuring
        const {
          "1. open": open,
          "2. high": high,
          "3. low": low,
          "4. close": close,
          "5. volume": volume,
        } = minuteInfo[i][1];

        // minute array objects
        array[i] = {
          minute: `${minute}`,
          open: `${open}`,
          high: `${high}`,
          low: `${low}`,
          close: `${close}`,
          volume: `${volume}`,
        };
      }

      // SEND TO DATABASE
      await Day.insertMany(array, (error, docs) => {
        if (error) {
          console.log("Impossible to insert documents in database.");
        } else {
          console.log("Documents sucessfully added!");
        }
      });
    } catch (e) {
      console.log("ERROR: ", e);
    }
  // });
};

module.exports = infoRequest;
