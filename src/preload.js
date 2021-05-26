const { contextBridge } = require('electron')
const remote = require('@electron/remote');

const mainWindow = remote.getCurrentWindow();

contextBridge.exposeInMainWorld(
  'TOMATINHO_API',
  {
    minimize: () => {
      mainWindow.minimize();
    },
    close: () => {
      mainWindow.close();
    },
  },
);
