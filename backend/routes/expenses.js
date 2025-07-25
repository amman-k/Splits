// backend/routes/expenses.js

const express = require('express');
const router = express.Router();

// Import middleware
const auth = require('../middleware/auth');
const { isGroupOwner } = require('../middleware/groups');

// Import Models
const Expense = require('../models/expense.model');
const Group = require('../models/group.model');
const User = require('../models/user.model');

/**
 * @route   POST /api/expenses
 * @desc    Create a new expense
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  
  const { description, amount, groupId } = req.body;
  const paidById = req.user.id;

  if (!description || !amount || !groupId) {
    return res.status(400).json({ msg: 'Please provide description, amount, and group ID' });
  }

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }
    const isMember = group.members.some(memberId => memberId.toString() === paidById);
    if (!isMember) {
        return res.status(403).json({ msg: 'You are not a member of this group' });
    }
  
    const numMembers = group.members.length;
    if (numMembers === 0) {
        return res.status(400).json({ msg: 'Cannot add expense to an empty group.' });
    }
    const share = amount / numMembers;

    const splitAmong = group.members.map(memberId => ({
      user: memberId,
      share: share,
    }));

    const newExpense = new Expense({
      description,
      amount,
      group: groupId,
      paidBy: paidById,
      splitAmong, // Save the newly calculated split
      status: group.owner.toString() === paidById ? 'approved' : 'pending',
    });

    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ... (the rest of the routes remain the same)

/**
 * @route   GET /api/expenses/group/:groupId
 * @desc    Get all expenses for a specific group
 * @access  Private
 */
router.get('/group/:groupId', auth, async (req, res) => {
    try {
        const expenses = await Expense.find({ group: req.params.groupId }).populate('paidBy', 'username');
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


/**
 * @route   PUT /api/expenses/:id/approve
 * @desc    Approve a pending expense
 * @access  Private (Group Owner Only)
 */
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

/**
 * @route   PUT /api/expenses/:id/reject
 * @desc    Reject a pending expense
 * @access  Private (Group Owner Only)
 */
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
