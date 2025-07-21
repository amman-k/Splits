const mongoose = require("mongoose");

const ExpenseSchema = mongoose.Schema({
  description: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Expense amount is required"],
    min: [0.01, "Amount must be greater than 0"],
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  splitAmong: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      share: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Expense=mongoose.model('Expense',ExpenseSchema);

module.exports=Expense;
