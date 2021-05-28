const { app, BrowserWindow, Menu, Tray } = require('electron');
const { resolve } = require('path');
const { initialize } = require('@electron/remote/main');

let mainWindow;

const IS_DEV = process.env.NODE_ENV === 'development';

if (IS_DEV) {
  const srcPath = resolve(__dirname);
  require('electron-reload')(srcPath);
}

const startWindow = () => {
  mainWindow = new BrowserWindow({
    width: 160,
    height: 150, // 190,
    maxWidth: 160,
    maxHeight: 150, // 190,
    frame: false,
    transparent: true,
    icon: resolve(__dirname, 'assets', 'images', 'tomatinho.png'),
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
  startWindow();
  initialize();
});
