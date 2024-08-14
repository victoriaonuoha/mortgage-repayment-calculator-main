const mortgageAMount = document.getElementById("mortgageAmount");
const mortgageTerm = document.getElementById("mortgageTerm");
const interestRate = document.getElementById("interestRate");
const repaymentRadioBtn = document.getElementById("repaymentRadioBtn");
const repaymentdivBtn = document.getElementById("repaymentdivBtn");
const interestRadioBtn = document.getElementById("interestRadioBtn");
const interestDivBtn = document.getElementById("interestDivBtn");
const calculateBtn = document.getElementById("calculateBtn");

// error ellements
const amountSymbol = document.getElementById("amountSymbol");
const amountError = document.getElementById("amountError");
const amountContainer = document.getElementById("amount-container");

const termSymbol = document.getElementById("termSymbol");
const termError = document.getElementById("termError");
const termContainer = document.getElementById("termContainer");

const rateSymbol = document.getElementById("rateSymbol");
const rateError = document.getElementById("rateError");
const rateContainer = document.getElementById("rateContainer");

const clearBtn = document.getElementById("clearBtn");

const resultsSection = document.getElementById("resultSection");
const emptyResultsSection = document.getElementById("emptyResultSectioon");

clearBtn.addEventListener('click', () => {
  mortgageAMount.value = ""
  mortgageTerm.value = ""
  interestRate.value = ""
  repaymentRadioBtn.checked = false
  interestRadioBtn.checked = false
  resultsSection.querySelectorAll("span")[0].textContent = 0;
  resultsSection.querySelectorAll("span")[1].textContent = 0;
})

repaymentdivBtn.addEventListener("click", () => {
  repaymentRadioBtn.checked = true;
});

interestDivBtn.addEventListener("click", () => {
  interestRadioBtn.checked = true;
});

function isEmpty(field) {
  return field.value === "";
}

function emptyInputs() {
  if (isEmpty(mortgageAMount)) {
    // alert("empty");
    amountSymbol.classList.remove("symbol");
    amountSymbol.classList.add("symbol-error");
    amountContainer.classList.remove("border-slate-200");
    amountContainer.classList.add("border-red-500");
    amountError.classList.remove("hidden");
    // console.log(amountContainer)
  } else {
    amountSymbol.classList.add("symbol");
    amountSymbol.classList.remove("symbol-error");
    amountContainer.classList.add("border-slate-200");
    amountContainer.classList.remove("border-red-500");
    amountError.classList.add("hidden");
  }
  if (isEmpty(mortgageTerm)) {
    // alert("empty");
    termSymbol.classList.remove("symbol");
    termSymbol.classList.add("symbol-error");
    termContainer.classList.remove("border-slate-200");
    termContainer.classList.add("border-red-500");
    termError.classList.remove("hidden");
    // console.log(amountContainer)
  } else {
    termSymbol.classList.add("symbol");
    termSymbol.classList.remove("symbol-error");
    termContainer.classList.add("border-slate-200");
    termContainer.classList.remove("border-red-500");
    termError.classList.add("hidden");
  }
  if (isEmpty(interestRate)) {
    // alert("empty");
    rateSymbol.classList.remove("symbol");
    rateSymbol.classList.add("symbol-error");
    rateContainer.classList.remove("border-slate-200");
    rateContainer.classList.add("border-red-500");
    rateError.classList.remove("hidden");
    // console.log(amountContainer)
  } else{
    rateSymbol.classList.add("symbol");
    rateSymbol.classList.remove("symbol-error");
    rateContainer.classList.add("border-slate-200");
    rateContainer.classList.remove("border-red-500");
    rateError.classList.add("hidden");
  }
}

const typeError = document.createElement("p");
typeError.className = "text-red-600 mt-2 text-xs";
typeError.innerText = "This field is required!";

function validateMortgageType() {
  const isRepaymentChecked = repaymentRadioBtn.checked;
  const isInterestChecked = interestRadioBtn.checked;

  if (!isRepaymentChecked && !isInterestChecked) {
    interestDivBtn.parentNode.insertBefore(
      typeError,
      interestDivBtn.nextSibling
    );
    return false;
  } else {
    if (typeError.parentNode) {
      typeError.parentNode.removeChild(typeError);
    }
    return true;
  }
}

function displayResults(monthlyRepayment, principal, numPayments) {
  const totalRepayment = monthlyRepayment * numPayments;

  // Show the results section and hide the empty results section
  
  resultsSection.classList.remove("hidden");
  emptyResultsSection.classList.add("hidden");
  emptyResultsSection.classList.remove("md:flex");

  // Display the results
  resultsSection.querySelector("span").textContent =
    monthlyRepayment.toFixed(2);
  resultsSection.querySelectorAll("span")[1].textContent =
    totalRepayment.toFixed(2);
}


function calculateMortgage() {
  const P = parseFloat(mortgageAMount.value);
  const annualInterestRate = parseFloat(interestRate.value) / 100;
  const r = annualInterestRate / 12;
  const n = parseInt(mortgageTerm.value) * 12;

  let monthlyRepayment;

  if (repaymentRadioBtn.checked) {
    // Repayment Mortgage Calculation
    monthlyRepayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else if (interestRadioBtn.checked) {
    // Interest-Only Mortgage Calculation
    monthlyRepayment = (P * annualInterestRate) / 12;
  }

  // console.log(monthlyRepayment)

  displayResults(monthlyRepayment, P, n);
}


calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  emptyInputs();
  const isTypeValid = validateMortgageType();

  if (
    !isEmpty(mortgageAMount) &&
    !isEmpty(mortgageTerm) &&
    !isEmpty(interestRate) &&
    isTypeValid
  ) {
    calculateMortgage();
  }
});



// console.log(mortgageAMount)
// console.log(mortgageTerm)
// console.log(interestRate)
