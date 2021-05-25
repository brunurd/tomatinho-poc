const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const IS_DEV = process.env.NODE_ENV === 'development';

if (IS_DEV) {
  const srcPath = path.join(__dirname);
  const electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron');
  require('electron-reload')(srcPath, { electron: electronPath });
}

const start = () => {
  mainWindow = new BrowserWindow({
    width: 180,
    height: 203,
    maxWidth: 180,
    maxHeight: 203,
    frame: false,
    transparent: true,
  });

  mainWindow.setMenu(null);
  mainWindow.loadFile('src/index.html');
  mainWindow.setAlwaysOnTop(true);

  if (IS_DEV) mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  start();
})