
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
    itemElem.setAttribute("item", "")
    iconElem.setAttribute("src", window.appIcon)
    nameElem.innerText = window.name
    itemElem.append(iconElem, nameElem)
    windowCaptureDropdown.appendChild(itemElem)
  }
}