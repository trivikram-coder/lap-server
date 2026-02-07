function buildFeatures(d) {
  return [
    d.credit,                                          // 0 credit
    Math.log(d.ApplicantIncome),                       // 1 ApplicantIncomelog
    Math.log(d.LoanAmount),                            // 2 LoanAmountlog
    Math.log(d.Loan_Amount_Term),                      // 3 Loan_Amount_Termlog
    Math.log(d.ApplicantIncome + d.CoapplicantIncome), // 4 totalincomelog ✅✅✅
    d.gender === "Male" ? 1 : 0,                       // 5 male
    d.married === "Yes" ? 1 : 0,                       // 6 married_yes
    d.dependents === "1" ? 1 : 0,                      // 7 dependents_1
    d.dependents === "2" ? 1 : 0,                      // 8 dependents_2
    d.dependents === "3+" ? 1 : 0,                     // 9 dependents_3
    d.education === "Not Graduate" ? 1 : 0,            // 10 not_graduate
    d.employed === "Yes" ? 1 : 0,                      // 11 employed_yes
    d.area === "Semiurban" ? 1 : 0,                    // 12 semiurban
    d.area === "Urban" ? 1 : 0                         // 13 urban
  ];
}

module.exports = buildFeatures;
