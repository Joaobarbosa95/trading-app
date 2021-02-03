const mongoose = require("mongoose");
const request = require("request");
// const mongConnection = require("../mongoose/mongoose.js");
const express = require("express");
const app = express();
app.use(express.json());

const url =
  "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI";

const infoRequest = async function (url, stockSymbol) {
  // INFO REQUEST
  request({ url, json: true }, async (error, { body }) => {
    let data = await body;
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

    // INFO DESTRUCTURING
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
  });
};

module.exports = infoRequest;
