const { app, BrowserWindow } = require('electron');
const { spawn } = require("child_process");
const path = require('path');
const net = require("net");

const isDev = !app.isPackaged;
let pyProc = null;
let backendServer;

function waitForPort(port, host = "127.0.0.1") {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const socket = new net.Socket();
      socket.once("connect", () => {
        clearInterval(interval);
        socket.destroy();
        resolve();
      });
      socket.once("error", () => socket.destroy());
      socket.connect(port, host);
    }, 500);
  });
}

async function startPythonServer() {
  const pythonCmd = process.platform === "win32" ? "python" : "python3";
  const script = path.join(__dirname, "python-backend", "server.py");

  pyProc = spawn(pythonCmd, [script]);

  pyProc.stdout.on("data", (d) => console.log("[PY]", d.toString()));
  pyProc.stderr.on("data", (d) => console.error("[PY ERR]", d.toString()));

  await waitForPort(5001);
  console.log("✅ Python OCR server is ready on 5001");
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'renderer', 'dist', 'index.html'));
  }
}

app.whenReady().then(async () => {
  backendServer = require('./backend/server');

  await startPythonServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("before-quit", () => {
  if (pyProc) {
    try {
      pyProc.kill();
      console.log("🛑 Python server stopped");
    } catch (e) {
      console.error("Failed to kill python", e);
    }
  }

  if (backendServer) {
    try {
      backendServer.close(() => console.log("🛑 Node backend stopped"));
    } catch (e) {
      console.error("Failed to stop backend server", e);
    }
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
