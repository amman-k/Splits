const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { isGroupOwner } = require('../middleware/groups');


const Expense = require('../models/expense.model');
const Group = require('../models/group.model');
const User = require('../models/user.model');

router.post('/', auth, async (req, res) => {
  const { description, amount, groupId, splitAmong } = req.body;
  const paidById = req.user.id;
  if (!description || !amount || !groupId) {
    return res.status(400).json({ msg: 'Please provide description, amount, and group ID' });
  }
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    if (!group.members.includes(paidById)) {
        return res.status(403).json({ msg: 'You are not a member of this group' });
    }

    const newExpense = new Expense({
      description,
      amount,
      group: groupId,
      paidBy: paidById,
      splitAmong,
      status: group.owner.toString() === paidById ? 'approved' : 'pending',
    });

    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/group/:groupId', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ group: req.params.groupId }).populate('paidBy', 'username');
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id/approve', [auth, isGroupOwner], async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true }
        );
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id/reject', [auth, isGroupOwner], async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        );
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
