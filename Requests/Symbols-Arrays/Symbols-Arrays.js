const fs = require("fs");

const S0_500 = fs
  .readFileSync(`${__dirname}/0-500.txt`, { encoding: "utf-8" })
  .split(",");
const S501_1000 = fs
  .readFileSync(`${__dirname}/501-1000.txt`, { encoding: "utf-8" })
  .split(",");
const S1001_1500 = fs
  .readFileSync(`${__dirname}/1001-1500.txt`, { encoding: "utf-8" })
  .split(",");
const S1501_2000 = fs
  .readFileSync(`${__dirname}/1501-2000.txt`, { encoding: "utf-8" })
  .split(",");

module.exports = { S0_500, S501_1000, S1001_1500, S1501_2000 };

// Arrays are sorted by market cap, from 13/02/2021
