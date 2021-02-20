// https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25&offset=0&download=true

// To add to database on "General Info":
// - symbol
// - name
// - country
// - ipoyear
// - industry
// - sector
// - url

// Use ptcchange to rank/sort the highest movers.
// And marketCap to rank by cap
// Volume to:
//      volume/ptcchange ratio
//      daily volume

// Use this ranking to select the

const request = require("request");
const fs = require("fs");

// const fetch = request({ url, json: true }, (error, body) => {
//   console.log("ai");
//   if (error) console.log(error);
//   fs.writeFileSync("body.json", body);
// });

// console.log("yo", fetch);
