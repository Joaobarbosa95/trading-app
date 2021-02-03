//-------------------------------------------------------------------------------------------

// Alphavantage API request
// for loop requests 500 requests
// await for indiviual request
// if request.include("Note"), i = i - 1 to repeat and set a timeout = to ...
// else you can save it and continue

// problem: keys can request at the same time, calculating start and end for each one
//          this is only applicable to old data
//          After that daily requests need to be handle the same way (probably iterating over an array of stock symbol)
//          Save to API? || FOLDER? || ...

const request = require("request");
const express = require("express");
const infoRequest = require("./request.js");

const app = express();
app.use(express.json());

const stocks = ["AAPL", "AMD", "AMZN", "MSFT", "FB", "TSLA"];
const APIkeys = [];

const requestNum = 0; // count request. When hit 500, change API key

async function APIrequest(stockSymbol, APIkey) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&outputsize=full&apikey=${APIkey}`;

  await infoRequest(url, stockSymbol);
}

// RESTRICTIONS BYPASS
for (let a of stocks) {
  APIrequest(a, "HB0PMD4LP8OD0VAI");
}

app.listen(3000, () => console.log("Server running on port 3000"));
