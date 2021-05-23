require("dotenv").config({ path: "./config/.env" });
const crypto = require("crypto");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_SECRET = process.env.GEMINI_API_SECRET;

/*  ====================
THIS FILE IS CONFIGURED FOR:
  GEMINI > REST > Fund Management API > Transfers
  Reference:  https://docs.gemini.com/rest-api/#transfers
*/
const ENDPOINT = "https://api.gemini.com";
const REQUEST = "/v1/transfers";
const URL = ENDPOINT + REQUEST;

const NONCE = String(Math.floor(Date.now() / 1000) * 1000);

/*  ====================
What is PAYLOAD?
It  contains the parameters required by Gemini for each request type, which can be found in the official documentation.
To be attached in the request header.

Refer to documentation for different parameters needed by each request: https://docs.gemini.com/rest-api/
*/
const PAYLOAD = {
  request: REQUEST,
  nonce: NONCE,
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

module.exports = { URL, HEADERS };
