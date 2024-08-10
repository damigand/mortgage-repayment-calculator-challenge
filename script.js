const repaymentDiv = document.querySelector(".repayment");
const interestDiv = document.querySelector(".interest-only");

repaymentDiv.addEventListener("click", (event) => {
    const radio = repaymentDiv.childNodes[1];
    radio.checked = true;
});

interestDiv.addEventListener("click", (event) => {
    const radio = interestDiv.childNodes[1];
    radio.checked = true;
});
