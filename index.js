const {app, ipcMain} = require("electron");
const fs = require("fs");
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
  const picturesPath = path.join(app.getPath('pictures'), "Screenshot11");
  if (!fs.existsSync(picturesPath)) {
    fs.mkdirSync(picturesPath);
  }
  return picturesPath;
})

app.whenReady().then(onReady)


