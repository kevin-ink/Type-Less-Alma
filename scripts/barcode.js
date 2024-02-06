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

// listens for urlchange message from background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "urlchange") {
    for (bf of barcodeFields) {
      let targetElement = document.getElementById(bf);
      if (targetElement) {
        targetElement.addEventListener("keydown", interceptKey);
      }
    }
  }
});

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
