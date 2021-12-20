export async function getPicturesPath() {
  const customPath = localStorage["picturesPath"];
  if (customPath) return customPath;
  return electron.defaultPicturesPath()
}

export async function setPicturesPath(path) {
  localStorage["picturesPath"] = path;
  if (!path) {
    localStorage.removeItem("picturesPath");
  }
}