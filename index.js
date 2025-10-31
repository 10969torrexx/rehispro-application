const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = !(app.isPackaged ?? true);
let backendServer;

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
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("before-quit", () => {
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
