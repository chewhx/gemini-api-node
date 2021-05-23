const fs = require("fs");
const axios = require("axios");
const { URL, HEADERS, SYMBOL } = require("../config/trades");
const consoleTrades = require("../utils/consoleTrades");

exports.getPastTradesAndConsoleLog = async () => {
  try {
    const { data } = await axios({
      method: "post",
      url: URL,
      headers: HEADERS,
    });
    consoleTrades(data);
  } catch (error) {
    console.error(error);
  }
};

exports.getPastTradesAndSave = async () => {
  try {
    const { data } = await axios({
      method: "post",
      url: URL,
      headers: HEADERS,
    });
    fs.writeFileSync(
      `./gemini-trade-history-${SYMBOL}.json`,
      JSON.stringify(data),
      {
        encoding: "utf-8",
      }
    );
  } catch (error) {
    console.error(error);
  }
};
