window.addEventListener("load", (event) => {
    const input = document.getElementById("pageBeanitemLoanParametersbarcode");
    if (input) {
        input.addEventListener("keydown", interceptKey);
    }
});

function interceptKey(e) {
    let regex = /^CBK-\d{3}$/;
    let input = e.target;
    if (e.key == "Enter" && regex.test(input.value)) {
        e.preventDefault();
        input.value = input.value.replace("-","");
        button = document.getElementById("fulfillment_dischargeok");
        if (button) {
            button.click();
        }
        else {
            button = document.getElementById("checkoutpatronworkspaceok");
            button.click();
        }
    }
}