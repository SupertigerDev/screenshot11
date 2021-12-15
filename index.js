const {app, BrowserWindow} = require("electron");


const onReady = () => {
  console.log("ready")
}



app.whenReady().then(onReady)


