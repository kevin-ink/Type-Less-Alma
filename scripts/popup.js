document.addEventListener("DOMContentLoaded", function () {
  // attach url to 'source code' button
  let btn = document.getElementById("getSrc");
  if (btn) {
    btn.addEventListener("click", () => {
      chrome.tabs.create({
        url: "https://github.com/kevin-ink/Type-Less-Alma",
      });
    });
  }
  // listen for changes to time toggling button
  // and notify time.js
  btn = document.getElementById("toggle");
  if (btn) {
    // get locally stored toggle value
    chrome.storage.local.get(["militaryTime"]).then((result) => {
      if (result.militaryTime) {
        btn.checked = result.militaryTime;
      }
    });
    // watch out for change to toggle
    btn.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      const message = {
        action: "timeToggle",
      };
      chrome.storage.local.set({ militaryTime: isChecked });
      chrome.runtime.sendMessage(message);
    });
  }
  // fetch version from manifest and update popup
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
