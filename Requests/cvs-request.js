const puppeteer = require("puppeteer");
const fs = require("fs");

const req = async function () {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // headless needs a userAgent to be set
  await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0)");

  // await page.setRequestInterception(true);
  // await page.on("request", async function (request) {
  //   const yo = await request.url();
  //   console.log(yo);
  // });

  return await page
    .goto(
      "https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=10000&offset=100000&download=true",
      {
        timeout: 0,
      }
    )
    .then((data) => data.text())
    .then((data) => JSON.parse(data))
    .then((data) => data.data.rows);

};

const sorting = async function () {
  const data = await req();
  const dataArray = Array.from(data);

  // From highest to lowest
  dataArray.sort((a, b) => {
    return b.marketCap - a.marketCap;
  });

  // 
  // for (let i = 0; i < 2001; i++) {
  //   if (i <= 500) {
  //     fs.appendFileSync("0-500.txt", ` ${dataArray[i].symbol}`);
  //   } else if (i <= 1000) {
  //     fs.appendFileSync("501-1000.txt", ` ${dataArray[i].symbol}`);
  //   } else if (i <= 1500) {
  //     fs.appendFileSync("1001-1500.txt", ` ${dataArray[i].symbol}`);
  //   } else if (i <= 2000) {
  //     fs.appendFileSync("1501-2000.txt", ` ${dataArray[i].symbol}`);
  //   }
  // }

  const files = ["0-500.txt", "501-1000.txt", "1001-1500.txt", "1501-2000.txt"];


  // 
  function format(file) {
    let symbols = fs.readFileSync(file, { encoding: "utf-8" });
    symbols = symbols.split(" ");
    symbols.shift();
    fs.writeFileSync(`Symbols-Arrays\\${file}`, symbols.toString());
  }

  files.map((el) => format(el));
  console.log("DONE");
  const spread = fs.readFileSync("Symbols-Arrays\\0-500.txt", {
    encoding: "utf-8",
  });
};

sorting();
// Notes
// See how the information is displayed.
// Understand the basic works of dependencies by documentation, instead of trial/error (time consuming):
// function parameters
// functions return values
// general construction logic
//
