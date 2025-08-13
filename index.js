const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

let backendServer; // store server instance

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

app.whenReady().then(() => {
  backendServer = require('./backend/server');

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // localStorage.clear();
  if (backendServer) {
    backendServer.close(() => {
      console.log('Backend server stopped');
      if (process.platform !== 'darwin') app.quit();
    });
  } else {
    if (process.platform !== 'darwin') app.quit();
  }
});
