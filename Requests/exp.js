const mongoose = require("mongoose");
const axios = require("axios");
const express = require("express");
const HttpsProxyAgent = require("https-proxy-agent");

// const app = express();
// app.use(express.json());

// STOCK ARRAYS
const {
  S0_500,
  S501_1000,
  S1001_1500,
  S1501_2000,
} = require("./Symbols-Arrays/Symbols-Arrays.js");

// API KEYS
const { api_keys } = require("./API-keys.json");

// const httpAgent = new HttpsProxyAgent();
const instance = axios.create({
  proxy: {
    host: "117.89.24.42",
    port: "53191",
    protocol: "http",
  },
  "Proxy-Authorization": Basic,
});

const url =
  "http://117.89.24.42:53191/https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AEIS&interval=1min&outputsize=full&apikey=7T5OCZSH71E6H75O";

// const url =
//   "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI";

async function infoRequest(url, stockSymbol) {
  try {
    //INTERCEPTORS
    instance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        // console.log(config.adapter.toString());
        console.log(config);
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res) => {
        console.log("RESPONSE", res);
        return res;
      },
      (error) => Promise.reject(error)
    );

    //====================================
    const query = await instance.get(url);
    let data = await query.data;

    // ERROR HANDLING
    if (Object.keys(data).includes("Note"))
      console.log(stockSymbol + " EXCESSIVE REQUEST");
    // if (error) console.log("UNABLE TO FETCH DATA FROM SOURCE: ", error);

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
    console.log(e);
  }
}

async function APIrequest(stockSymbol, APIkey) {
  //   const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&outputsize=full&apikey=${APIkey}`;

  await infoRequest(url, stockSymbol);
}

// let count = 0;
// const reqInterval = setInterval(() => {
//   // APIrequest(
//   //   S0_500[count],
//   //   `${api_keys[0].api_key}`,
//   //   "http:/116.12.236.213:8080"
//   // );
//   // APIrequest(
//   //   S501_1000[count],
//   //   `${api_keys[1].api_key}`,
//   //   "http://116.12.236.212:8080"
//   // );
//   //   APIrequest(S1001_1500[count], `${api_keys[2].api_key}`);

//   APIrequest(S1501_2000[count], `${api_keys[3].api_key}`);
//   count++;
//   console.log(count);
//   if (count === 500) clearInterval(reqInterval);
// }, 2000);

infoRequest(url, "AEIS");
