
const windowCaptureButton = document.querySelector("[window-capture-button]")
const windowCaptureDropdown = document.querySelector("[window-capture-dropdown]")
let windows = [];
let showWindowCaptureDropdown = false;



windowCaptureButton.addEventListener("click", async () => {
  if (showWindowCaptureDropdown) {
    showWindowCaptureDropdown = false
    windowCaptureButton.removeAttribute("selected")
    windowCaptureDropdown.style.display ="none"
    return;
  }
  windowCaptureButton.setAttribute("selected", "")
  showWindowCaptureDropdown = true
  windowCaptureDropdown.style.display ="block"
  populateWindowCapture();
})

setInterval(() => {
  if (showWindowCaptureDropdown) {
    populateWindowCapture()
  }
}, 5000);

async function populateWindowCapture() {
  windows = await electron.getWindows();
  windowCaptureDropdown.innerHTML = ""
  for (let i = 0; i < windows.length; i++) {
    let window = windows[i];
    const itemElem = document.createElement('div');
    const iconElem = document.createElement('img');
    const nameElem = document.createElement('div');
    nameElem.setAttribute("name", "")
    iconElem.setAttribute("src", window.appIcon)
    nameElem.innerText = window.name
    itemElem.setAttribute("id", window.id);
    itemElem.setAttribute("item", "")
    itemElem.append(iconElem, nameElem)
    windowCaptureDropdown.appendChild(itemElem)
  }
}

windowCaptureDropdown.addEventListener("click", async (event) => {
  const target = event.target.closest("[item]");
  const id = target.id;
  const stream = await getStream(id);
  const dataUrl = await takeScreenshot(stream);
  console.log(dataUrl)
})


async function getStream(id) {
  const mediaDevices = navigator.mediaDevices;
  const stream = await mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: id,
        maxFrameRate: 10,
        maxWidth: 4000,
        maxHeight: 4000
      },
    },
  });
  return stream;
}

async function takeScreenshot(stream) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.addEventListener('loadedmetadata', function(){
      const canvas = document.createElement('canvas');
      canvas.width = this.videoWidth;
      canvas.height = this.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(this, 0, 0);
      const url = canvas.toDataURL();
      resolve(url)
    },false);
    video.srcObject = stream;
    video.play();
  })
}