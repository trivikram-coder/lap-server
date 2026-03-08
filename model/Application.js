const mongoose=require("mongoose")
const loanApplicationSchema = new mongoose.Schema(
  {
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true
    },

    married: {
      type: String,
      enum: ["married", "single"],
      required: true
    },

    dependents: {
      type: String,
      enum: ["0", "1", "2", "3+"],
      required: true
    },

    education: {
      type: String,
      enum: ["Graduate", "Not Graduate"],
      required: true
    },

    employed: {
      type: String,
      enum: ["Yes", "No"],
      required: true
    },

    ApplicantIncome: {
      type: Number,
      required: true,
      min: 0
    },

    CoapplicantIncome: {
      type: Number,
      default: 0
    },

    LoanAmount: {
      type: Number,
      required: true
    },

    Loan_Amount_Term: {
      type: Number,
      required: true
    },

    area: {
      type: String,
      enum: ["Urban", "Semiurban", "Rural"],
      required: true
    },

    cibilScore: {
      type: Number,
      required: true,
      min: 300,
      max: 900
    },

    status: {
      type: String,
      enum: ["ELIGIBLE", "NOT_ELIGIBLE"],
      default: "NOT_ELIGIBLE"
    },

    reasons: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const LoanApplication = mongoose.model(
  "LoanApplication",
  loanApplicationSchema
);

module.exports=LoanApplication