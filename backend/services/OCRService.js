const { writeLog } = require('../utils/logger');
const { spawn } = require("child_process");
const path = require("path");

async function callPythonOCR(filePaths) {
  return new Promise((resolve, reject) => {
    try{
      const pythonCmd = process.platform === "win32"? "python" : "python3";
      const scriptPath = path.join(__dirname, "../..", "python-backend", "ocr_script.py");
      const files = Array.isArray(filePaths) ? filePaths : [filePaths];

      const pyProc = spawn(pythonCmd, [scriptPath, ...files]);
      let output= "";
      let errorOutput= "";
      pyProc.stdout.on("data", (data) => (output += data.toString()));
      pyProc.stderr.on("data", (data) => (errorOutput += data.toString()));

      pyProc.on("close", (code) => {
        if (code !== 0) {
          writeLog(`[error] [callPythonOCR] exited with code ${code}: ${errorOutput}`);
          return resolve({ success: false, message: "Python script error" });
        }

        try {
          const result = JSON.parse(output);
          writeLog(`[info] [callPythonOCR] ${JSON.stringify(result)}`);
          resolve(result);
        } catch (err) {
          writeLog(`[error] [callPythonOCR] Invalid JSON: ${output}`);
          resolve({ success: false, message: "Invalid Python output" });
        }
      });
    } catch(error) {
      writeLog(`[error] [callPythonOCR] ${error}`);
      resolve({ success: false, message: "Something went wrong." });
    }
  });
}

module.exports = { callPythonOCR }