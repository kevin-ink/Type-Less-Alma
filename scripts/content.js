let buttonIds;
let barcodeFields;

// mutation function
const mutationCallback = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (const bf of barcodeFields) {
        let targetElement = document.getElementById(bf);
        if (targetElement) {
          targetElement.addEventListener("keydown", interceptKey);
          const getMenuButton = document.querySelector(
            'button[aria-label="Fullfillment"]'
          );
          getMenuButton.addEventListener("click", handleClick);
          observer.disconnect();
          return;
        }
      }
    }
  }
};

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
        observer.observe(document.body, config);
        return;
      }
    }
  }
}

//
function handleClick(e) {
  observer.observe(document.body, config);
  e.target.removeEventListener("click", handleClick);
}

// observe
const observer = new MutationObserver(mutationCallback);
const config = {
  childList: true,
  subtree: true,
};
observer.observe(document.body, config);

buttonIds = [
  "fulfillment_dischargeok",
  "checkoutpatronworkspaceok",
  "requestscan_in_interfaceformok",
];

barcodeFields = [
  "pageBeanbarcode",
  "pageBeanitemLoanParametersbarcode",
  "pageBeanscannedRequestId",
];
