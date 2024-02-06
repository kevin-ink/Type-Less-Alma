// barcodes that can be matched
const barcodeFields = [
  "pageBeanbarcode",
  "pageBeanitemLoanParametersbarcode",
  "pageBeanscannedRequestId",
];

// buttons that can be clicked by extension
const buttonIds = [
  "fulfillment_dischargeok",
  "checkoutpatronworkspaceok",
  "requestscan_in_interfaceformok",
];

function setupBarcodeReplacement() {
  for (bf of barcodeFields) {
    let elem = document.getElementById(bf);
    if (elem) {
      elem.addEventListener("keydown", interceptKey);
    }
  }
}

// function to handle barcode input
function interceptKey(e) {
  let regex = /^CBK-\d{3}$/;
  let input = e.target;
  if (e.key == "Enter" && regex.test(input.value)) {
    e.preventDefault();
    input.value = input.value.replace("-", "");
    for (const id of buttonIds) {
      const button = document.getElementById(id);
      if (button) {
        button.click();
      }
    }
  }
}

// listens for urlchange message from background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "urlchange") {
    setupBarcodeReplacement();
  }
});

// first time loading page
chrome.runtime.sendMessage({ message: "contentScriptLoaded" });
window.addEventListener("popstate", function () {
  setupBarcodeReplacement();
});
window.addEventListener("hashchange", function () {
  setupBarcodeReplacement();
});
