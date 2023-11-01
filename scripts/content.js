const buttonIds = [
    "fulfillment_dischargeok",
    "checkoutpatronworkspaceok",
    "requestscan_in_interfaceformok"
];

const barcodeFields = [
    "pageBeanbarcode",
    "pageBeanitemLoanParametersbarcode",
    "pageBeanscannedRequestId"
]

const pageTitles = [
    "Manage Item Returns",
    "Scan In Items",
    "Patron Services"
]

window.addEventListener("load", () => {
    const pageTitleElement = document.querySelector(".pageTitle");
    if (pageTitleElement && pageTitles.includes(pageTitleElement.textContent))
    {
        let checkForElem = setInterval(() => {
            for (const bf of barcodeFields) {
                const barcodeField = document.getElementById(bf);
                if (barcodeField) {
                    barcodeField.addEventListener("keydown", interceptKey);
                    clearInterval(checkForElem);
                }
            }
        }, 100);
    }
});

function interceptKey(e) {
    let regex = /^CBK-\d{3}$/;
    let input = e.target;
    console.log(input);
    if (e.key == "Enter" && regex.test(input.value)) {
        e.preventDefault();
        input.value = input.value.replace("-","");
        for (const id of buttonIds) {
            const button = document.getElementById(id);
            if (button) {
              button.click();
              return;
            }
        }
    }
}