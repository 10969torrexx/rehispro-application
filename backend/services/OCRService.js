const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function callPythonOCR(filePath) {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));
  const res = await axios.post("http://127.0.0.1:5001/ocr", form, {
    headers: form.getHeaders(),
    timeout: 60000
  });
  return res.data;
}

module.exports = { callPythonOCR }