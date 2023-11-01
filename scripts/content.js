window.addEventListener("load", () => {
    let checkForElem = setInterval(() => {
        const input = document.getElementById("pageBeanitemLoanParametersbarcode");
        if (input) {
            input.addEventListener("keydown", interceptKey);
            clearInterval(checkForElem);
        }
    }, 100);
});

const buttonIds = [
    "fulfillment_dischargeok",
    "checkoutpatronworkspaceok",
    "requestscan_in_interfaceformok"
];

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