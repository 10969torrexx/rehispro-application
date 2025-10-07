const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const { writeLog } = require('../utils/logger');

async function callPythonOCR(filePaths) {
  try {
    const form = new FormData();
    const files = Array.isArray(filePaths) ? filePaths : [filePaths];
    for (const path of files) {
      form.append("files", fs.createReadStream(path));
    }
    const response = await axios.post("http://127.0.0.1:5001/ocr", form, {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 60000
    });

    writeLog(`[info] [callPythonOCR] ${JSON.stringify(response.data)}`)
    if (response.data.success) {
      return {
        success: response.data.success,
        message: response.data.message,
        result: response.data.result
      }
    } else {
      return {
        success: response.data.success,
        message: response.data.message
      }
    }
  } catch (error) {
    writeLog(`[error] [callPythonOCR]: ${error}`)
    return {
      success: false,
      message: "Internal Server Error"
    }
  }
}

module.exports = { callPythonOCR }