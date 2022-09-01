const express = require("express");
const router = express.Router();
const RoleService = require("../../Services/role/role.service");

router.post("/", async (req, res) => {
  try {
    let { success, message, data } = await RoleService.create(req.body);

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { success, message, data } = await RoleService.update(
      req.params.id,
      req.body
    );

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let { success, message, data } = await RoleService.hardDelete(
      req.params.id
    );
    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/list", async (req, res) => {
  try {
    let { success, message, data } = await RoleService.list(
      req.body.where,
      req.body.pagination
    );

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
