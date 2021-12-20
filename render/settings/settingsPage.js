import { getPicturesPath } from "../js/utils.js";

const rightAreaElem = document.querySelector("[right-area]")
export async function showSettingsPage() {
  const res = await fetch("settings/settings.html");
  const html = await res.text();
  rightAreaElem.innerHTML = html

  // add stylesheet to page
  const cssElement = document.createElement("link");

  cssElement.type = "text/css";
  cssElement.rel = "stylesheet";
  cssElement.href = "settings/settings.css";
  cssElement.id = "settings-css"

  document.head.appendChild(cssElement);
  
  // load pictures path
  document.querySelector("[pictures-path]").textContent = await getPicturesPath();

}
export function hideSettingsPage() {
  document.getElementById("settings-css").remove();
  rightAreaElem.innerHTML = ""
}