//-------------------------------------------------------------------------------------------

// Alphavantage API request
// for loop requests 500 requests
// await for indiviual request
// if request.include("Note"), i = i - 1 to repeat and set a timeout = to ...
// else you can save it and continue

// Call infoRequest function to every API key (much easier and faster than change API keys)

const express = require("express");

// REQUEST
const infoRequest = require("./request.js");

// STOCK ARRAYS
const {
  S0_500,
  S501_1000,
  S1001_1500,
  S1501_2000,
} = require("./Symbols-Arrays/Symbols-Arrays.js");

// API KEYS
const { api_keys } = require("./API-keys.json");
const request = require("request");

// SERVER
const app = express();
app.use(express.json());

// stocks will have their own separate js files, to not crowd the app environment
// divide the stocks by alphabetic order (500 stocks max)
// each array to its own API key

async function APIrequest(stockSymbol, APIkey) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&outputsize=full&apikey=${APIkey}`;

  await infoRequest(url, stockSymbol);
}

app.get("/api", (req, res) => {
  let count = 0;
  const reqInterval = setInterval(() => {
    // APIrequest(
    //   S0_500[count],
    //   `${api_keys[0].api_key}`,
    //   "http:/116.12.236.213:8080"
    // );
    // APIrequest(
    //   S501_1000[count],
    //   `${api_keys[1].api_key}`,
    //   "http://116.12.236.212:8080"
    // );
    // APIrequest(
    //   S1001_1500[count],
    //   `${api_keys[2].api_key}`,
    //   "http://193.56.255.179:3128"
    // );
    APIrequest(S1501_2000[count], `${api_keys[3].api_key}`);
    count++;
    console.log(count);
    if (count === 500) clearInterval(reqInterval);
  }, 20000);
});

// console.log(`${api_keys[0].api_key}`, `${api_keys[1].api_key}`);

// this call will be on INDEX.js
app.listen(7000, () => console.log("Server running on port 7000"));

request("http://127.0.0.1:7000/api", (error, res) => {
  console.log("DONE");
});
// Notes
// proxy chaining seems a bit confused (or maybe was the url variable in request.js).
// try using curl or wget to proxy request the info if it exceeds the IP request (not the keys)
// Try running a server on another port
