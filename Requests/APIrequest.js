const infoRequest = require("./infoRequest.js");

// STOCK ARRAYS
const {
  S0_500,
  S501_1000,
  S1001_1500,
  S1501_2000,
} = require("./Symbols-Arrays/Symbols-Arrays.js");

// API KEYS
const { api_keys } = require("./API-keys.json");

// REQUEST FUNCTION
async function APIrequest(stockSymbol, APIkey) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&outputsize=full&apikey=${APIkey}`;

  await infoRequest(url, stockSymbol);
}

// IF THERE IS AN ERROR AND NEED TO START AT A PRECISE POINT
let count = process.argv[2] || 0;

// REQUESTS FUNCTION CALL
const reqInterval = setInterval(async () => {
  APIrequest(
    S0_500[count],
    `${api_keys[0].api_key}`,
    "https://yagura-proxy-one.herokuapp.com/proxy-one"
  );
  APIrequest(
    S501_1000[count],
    `${api_keys[1].api_key}`,
    "https://yagura-proxy-two.herokuapp.com/proxy-two"
  );
  APIrequest(
    S1001_1500[count],
    `${api_keys[2].api_key}`,
    "https://yagura-proxy-three.herokuapp.com/proxy-three"
  );
  APIrequest(
    S1501_2000[count],
    `${api_keys[3].api_key}`,
    "https://yagura-proxy-four.herokuapp.com/proxy-four"
  );

  count++;
  console.log(count);
  if (count === 500) clearInterval(reqInterval);
}, 15000);
