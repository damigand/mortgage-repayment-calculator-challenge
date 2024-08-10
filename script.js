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

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", () => checkForm());

const resetForm = document.querySelector(".reset");
const form = document.querySelector("#form");

resetForm.addEventListener("click", (event) => {
    form.reset();
});

function checkForm() {
    var errorState = false;

    const amountDiv = document.querySelector(".amount-input");
    const amountValue = document.querySelector("#amount").value;

    if (amountValue) {
        amountDiv.classList.remove("active");
    } else {
        amountDiv.classList.add("active");
        errorState = true;
    }

    const mortgageDiv = document.querySelector(".term-input");
    const mortgageTermValue = document.querySelector("#term").value;

    if (mortgageTermValue) {
        mortgageDiv.classList.remove("active");
    } else {
        mortgageDiv.classList.add("active");
        errorState = true;
    }

    const interestDiv = document.querySelector(".interest-input");
    const interestRateValue = document.querySelector("#interest").value;

    if (interestRateValue) {
        interestDiv.classList.remove("active");
    } else {
        interestDiv.classList.add("active");
        errorState = true;
    }

    const mortgageTypeDiv = document.querySelector(".mortgage-type");
    const mortgageType = document.querySelector(".mortgage-type input[type='radio']:checked");

    var type;

    if (mortgageType) {
        type = mortgageType.id;

        mortgageTypeDiv.classList.remove("active");
    } else {
        mortgageTypeDiv.classList.add("active");
        errorState = true;
    }

    if (!errorState) {
        calculateMortgage(amountValue, mortgageTermValue, interestRateValue, type);
    }
}

function calculateMortgage(amount, term, interest, type) {
    //formula
    // I = interest / 1200
    // P = term * 12
    // B = (1 + I) ^ P
    // Monthly = amount [I * B] / [B - 1]

    const i = interest / 1200;
    const p = term * 12;
    const b = Math.pow(1 + i, p);

    const monthlyNumber = amount * ((i * b) / (b - 1));
    const totalNumber = (monthlyNumber * p).toFixed(2);

    switch (type) {
        case "repayment":
            paintTotal(monthlyNumber, totalNumber);
            break;
        case "interest-only":
            const totalInterest = totalNumber - amount;
            const monthlyInterest = totalInterest / p;
            paintTotal(monthlyInterest, totalInterest, true);
    }
}

function paintTotal(monthly, total, interestOnly = false) {
    const formatter = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
    });

    const monthlyPayment = formatter.format(monthly);
    const totalPayment = formatter.format(total);

    const result = document.querySelector(".result-section");
    result.innerHTML = `
        <div class="result">
            <h2>Your results</h2>
            <span>
                Your results are shown below based on the information you provided. To
                adjust the results, edit the form and click “calculate repayments” again.
            </span>
            <div class="final-result">
                <span class="text">Your monthly repayments</span>
                <span class="number-monthly">${monthlyPayment}</span>
                <div class="separator"></div>
                <span class="text">Total you'll repay over the term</span>
                <span class="number-total">${totalPayment}</span>
                ${
                    interestOnly
                        ? `
                    <span class="warning">
                        * This is just the interest, you'll still have to pay the initial amount after.
                    </span>
                    `
                        : ``
                }
            </div>
        </div>
    `;
}
