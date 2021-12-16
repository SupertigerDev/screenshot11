const {app} = require("electron");
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



app.whenReady().then(onReady)


