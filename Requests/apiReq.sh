#!/bin/bash

curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=BCAT&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.213:8080 >> 1.txt
curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AMZN&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.213:8080 >> 2.txt
curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.213:8080 >> 3.txt
curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GME&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.213:8080 >> 4.txt
curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NIO&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.213:8080 >> 5.txt

curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.212:8080 >> 6.txt
curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.212:8080 >> 7.txt
curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TSLA&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.212:8080 >> 8.txt
curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=BBB&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.212:8080 >> 9.txt
curl "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=TWTR&interval=1min&outputsize=full&apikey=HB0PMD4LP8OD0VAI" -x http://116.12.236.212:8080 >> 10.txt
