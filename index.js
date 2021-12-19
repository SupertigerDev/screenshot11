const {app, ipcMain} = require("electron");
const {BrowserWindow} = require("electron-acrylic-window");
const path = require('path')

const onReady = () => {
  const window = new BrowserWindow({
    height: 800,
    width: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  window.loadURL(`file://${__dirname}/render/index.html`)
}

ipcMain.handle('default-pictures-path', async () => {
  const path = app.getPath('pictures');
  return path;
})

app.whenReady().then(onReady)


