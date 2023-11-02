let buttonIds;
let barcodeFields;
let pageTitle = "";
let isObserving = false;

// mutation function
const mutationCallback = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      if (observer.customID == "barcodeObserver") {
        for (const bf of barcodeFields) {
          let targetElement = document.getElementById(bf);
          if (targetElement) {
            targetElement.addEventListener("keydown", interceptKey);
            observer.disconnect();
            return;
          }
        }
      } else {
        let pageTitleElem = document.querySelector(".pageTitle");
        if (!pageTitleElem)
        {
          return;
        }
        if (
          targetElement2.textContent != pageTitle
        ) {
          pageTitle = targetElement2.textContent;
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
        isObserving = true;
        return;
      }
    }
  }
}

// observe
const observer = new MutationObserver(mutationCallback);
const observer2 = new MutationObserver(mutationCallback);
const config = {
  childList: true,
  subtree: true,
};
observer.observe(document.body, config);
observer.customID = "barcodeObserver";
isObserving = true;
observer2.observe(document.body, config);

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
