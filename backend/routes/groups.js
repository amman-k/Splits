const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const auth = require("../middleware/auth");

const Group = require("../models/group.model");
const User = require("../models/user.model");

router.post("/", auth, async (req, res) => {
  const { name } = req.body;
  const ownerId = req.user.id;

  if (!name) {
    return res.status(400).json({ msg: "Group name is required" });
  }

  try {
    const newGroup = new Group({
      name,
      owner: ownerId,
      members: [ownerId],
      joinCode: nanoid(8),
    });

    const group = await newGroup.save();
    res.status(201).json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/join", auth, async (req, res) => {
  const { joinCode } = req.body;
  const userId = req.user.id;

  if (!joinCode) {
    return res.status(400).json({ msg: "Join code is required" });
  }

  try {
    const group = await Group.findOne({ joinCode });
    if (!group) {
      return res.status(404).json({ msg: "Group not found with this code" });
    }

    if (group.members.includes(userId)) {
      return res
        .status(400)
        .json({ msg: "You are already a member of this group" });
    }
    group.members.push(userId);
    await group.save();

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/id:", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("owner", "username")
      .populate("members", "username");

    if (!group) {
      return res.status(404).json({ msg: "group not found" });
    }
    if (!group.members.some((member) => member._id.equals(req.user.id)));
    {
      return res.status(403).json({ msg: "Unautorized access" });
    }

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
