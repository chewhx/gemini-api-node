const fs = require("fs");
const axios = require("axios");
const { URL, HEADERS } = require("../config/transfers");
const consoleTransfers = require("../utils/consoleTransfers");

exports.getPastTransfersAndConsoleLog = async () => {
  try {
    const { data } = await axios({
      method: "post",
      url: URL,
      headers: HEADERS,
    });
    consoleTransfers(data);
  } catch (error) {
    console.error(error);
  }
};

exports.getPastTransfersAndSave = async () => {
  try {
    const { data } = await axios({
      method: "post",
      url: URL,
      headers: HEADERS,
    });
    fs.writeFileSync(`./gemini-transfers-history.json`, JSON.stringify(data), {
      encoding: "utf-8",
    });
  } catch (error) {
    console.error(error);
  }
};
