window.addEventListener("load", (event) => {
    var jsInitChecktimer = setInterval (checkForJS_Finish, 111);
    function checkForJS_Finish () {
        if (document.getElementById("pageBeanitemLoanParametersbarcode")) {
            clearInterval (jsInitChecktimer);
            input = document.getElementById("pageBeanitemLoanParametersbarcode");
            input.addEventListener("keydown", interceptKey);
        }
    }
});

function interceptKey(e) {
    var regex = /^CBK-\d{3}$/;
    if (e.keyCode == "13" && regex.test(input.value)) {
        e.preventDefault();
        input.value = input.value.replace("-","");
        button = document.getElementById("fulfillment_dischargeok");
        button.click();
    }

}