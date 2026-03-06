function getCreditFlag(cibilScore) {
  // Threshold can be adjusted based on dataset
  return cibilScore >= 650 ? 1 : 0;
}

function safeLog(value) {
  return Math.log(value > 0 ? value : 1);
}

function buildFeatures(d) {
  const applicantIncome = Number(d.ApplicantIncome) || 0;
  const coIncome = Number(d.CoapplicantIncome) || 0;
  const loanAmount = Number(d.LoanAmount) || 0;
  const loanTerm = Number(d.Loan_Amount_Term) || 0;

  // internally derived credit score
  const creditFlag = getCreditFlag(d.cibilScore);

  return [
    creditFlag,                                     // 0 credit_history (1 = good, 0 = bad)
    safeLog(applicantIncome),                       // 1 applicant_income_log
    safeLog(loanAmount),                            // 2 loan_amount_log
    safeLog(loanTerm),                              // 3 loan_term_log
    safeLog(applicantIncome + coIncome),            // 4 total_income_log

    d.gender === "Male" ? 1 : 0,                     // 5 male
    d.married === "Yes" ? 1 : 0,                     // 6 married_yes
    d.dependents === "1" ? 1 : 0,                    // 7 dependents_1
    d.dependents === "2" ? 1 : 0,                    // 8 dependents_2
    d.dependents === "3+" ? 1 : 0,                   // 9 dependents_3
    d.education === "Not Graduate" ? 1 : 0,          // 10 not_graduate
    d.employed === "Yes" ? 1 : 0,                    // 11 self_employed_yes
    d.area === "Semiurban" ? 1 : 0,                  // 12 semiurban
    d.area === "Urban" ? 1 : 0                       // 13 urban
  ];
}

module.exports = buildFeatures;
