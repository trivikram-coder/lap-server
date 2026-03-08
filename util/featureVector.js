function buildFeatures(d) {

  const applicantIncome = Number(d.ApplicantIncome) || 0;
  const coIncome = Number(d.CoapplicantIncome) || 0;
  const loanAmount = Number(d.LoanAmount) || 0;
  const loanTerm = Number(d.Loan_Amount_Term) || 0;

  const creditFlag = d.cibilScore >= 650 ? 1 : 0;

  const safeLog = (v) => Math.log(v > 0 ? v : 1);

  return [
    creditFlag,
    safeLog(applicantIncome),
    safeLog(loanAmount),
    safeLog(loanTerm),
    safeLog(applicantIncome + coIncome),

    d.gender === "Male" ? 1 : 0,
    d.married === "married" ? 1 : 0,

    d.dependents === "1" ? 1 : 0,
    d.dependents === "2" ? 1 : 0,
    d.dependents === "3+" ? 1 : 0,

    d.education === "Not Graduate" ? 1 : 0,
    d.employed === "Yes" ? 1 : 0,

    d.area === "Semiurban" ? 1 : 0,
    d.area === "Urban" ? 1 : 0
  ];
}

module.exports = buildFeatures;