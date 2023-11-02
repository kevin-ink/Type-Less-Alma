document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("getSrc");
  btn.addEventListener("click", () => {
    chrome.tabs.create({ url: "https://github.com/kevin-ink/Type-Less-Alma" });
  });
  fetch(chrome.runtime.getURL("manifest.json"))
    .then((response) => response.json())
    .then((manifest) => {
      document.getElementById("version").textContent =
        "Version: " + manifest.version;
    })
    .catch((error) => {
      console.error("Failed to fetch manifest:", error);
    });
});
