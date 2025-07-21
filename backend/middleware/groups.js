const Group = require("../models/group.model");
const Expense = require("../models/expense.model");

const isGroupOwner = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }
    const group = await Group.findById(expense.group);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    if (group.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "User is not the owner of this group" });
    }
    next();
  } catch (err) {
    console.error("Error in isGroupOwner middleware:", err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  isGroupOwner,
};
