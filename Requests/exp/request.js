const axios = require("axios");

const request = require("request");

// axios.get("http://127.0.0.1:3000/").then((response) => console.log(response));

axios.interceptors.request.use(
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
// axios.interceptors.response.use(
//   (res) => {
//     // console.log("RESPONSE", res);
//     return res;
//   },
//   (error) => Promise.reject(error)
// );

const instance = axios.create({
  
  // headers: { "Content-Type": "application/json" },
});
instance.post("https://yagura-proxy-server.herokuapp.com/",  { url: "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AEIS&interval=1min&outputsize=full&apikey=7T5OCZSH71E6H75O" }  ).then((response) => console.log(response.data));
