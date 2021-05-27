const { app, BrowserWindow } = require('electron');
const { resolve } = require('path');
const { initialize } = require('@electron/remote/main');

let mainWindow;

const IS_DEV = process.env.NODE_ENV === 'development';

if (IS_DEV) {
  const srcPath = resolve(__dirname);
  require('electron-reload')(srcPath);
}

const start = () => {
  mainWindow = new BrowserWindow({
    width: 180,
    height: 180,
    maxWidth: 180,
    maxHeight: 180,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
      preload: resolve(__dirname, 'preload.js'),
    },
  });

  mainWindow.setMenu(null);
  mainWindow.loadFile('src/index.html');
  mainWindow.setAlwaysOnTop(true);

  if (IS_DEV) mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  start();
  initialize();
});
