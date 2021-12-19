const {desktopCapturer, contextBridge, ipcRenderer} = require('electron')





const getWindows = async () => {
  const sources = await desktopCapturer.getSources({types: ["window"],fetchWindowIcons: true});
  return sources.map(source => {
    return {
      id: source.id,
      name: source.name,
      displayId: source.display_id,
      appIcon: source.appIcon.toDataURL(),
    }
  }).filter(window => window.name !== 'screenshot11')
}
const  defaultPicturesPath = () => {
  return ipcRenderer.invoke('default-pictures-path')
}

contextBridge.exposeInMainWorld('electron', {
  getWindows,
  defaultPicturesPath
})


