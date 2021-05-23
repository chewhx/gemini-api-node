require("dotenv").config({ path: "./config/.env" });
const crypto = require("crypto");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

/*  ====================
THIS FILE IS CONFIGURED FOR:
  GEMINI > REST > Order Status APIs > Get Past Trades > All BTCSGD Trades
  Reference:  https://docs.gemini.com/rest-api/#get-past-trades
  
  You may change the SYMBOL to request for trades of other currency, coins, or tokens.
  For list of symbols, refer to: https://docs.gemini.com/rest-api/?python#all-supported-symbols
*/
const ENDPOINT = "https://api.gemini.com";
const REQUEST = "/v1/mytrades";
const URL = ENDPOINT + REQUEST;
const SYMBOL = "btcsgd";

const NONCE = String(Math.floor(Date.now() / 1000) * 1000);

/*  ====================
What is PAYLOAD?
It  contains the parameters required by Gemini for each request type, which can be found in the official documentation.
To be attached in the request header.

For request to 'Get Past Trades', we need:
(1) request 
(2) nonce
(3) symbol
Refer to documentation for different parameters needed by each request: https://docs.gemini.com/rest-api/
*/
const PAYLOAD = {
  request: REQUEST,
  nonce: NONCE,
  symbol: SYMBOL,
};

/*  ====================
What is ENCODED_PAYLOAD?
Gemini does not take the payload/paramters in the request body as JSON. You have to encode them into a token. 
To be attached in the request header.
*/
const ENCODED_PAYLOAD = Buffer.from(JSON.stringify(PAYLOAD)).toString("base64");

/*  ====================
What is SIGNATURE?
A digital signature, encoded with your encoded_payload and gemini api secret
To be attached in the request header.
*/
const SIGNATURE = crypto
  .createHmac("sha384", GEMINI_API_SECRET)
  .update(ENCODED_PAYLOAD)
  .digest("hex");

/*  ====================
What are HEADERS?
Information about the HTTP request to be sent to Gemini. Edit as you seem fit.
*/
const HEADERS = {
  "Content-Type": "application/json",
  "X-GEMINI-APIKEY": GEMINI_API_KEY,
  "X-GEMINI-PAYLOAD": ENCODED_PAYLOAD,
  "X-GEMINI-SIGNATURE": SIGNATURE,
};

module.exports = { URL, HEADERS, SYMBOL };
