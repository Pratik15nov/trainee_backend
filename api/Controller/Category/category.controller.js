const express = require("express");
const router = express.Router();
const categoryService = require("../../Services/Category/category.service");
const multer = require("multer");
const categoryValidator = require("../../Controller/Category/category.validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/category");
  },
  filename: function (req, file, cb) {
    cb(null, "category-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const uploadImg = multer({ storage: storage }).single("categoryImg");

router.get("/:id", async (req, res) => {
  try {
    let { success, message, data } = await categoryService.Exists({
      _id: req.params.id,
    });

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/", uploadImg, categoryValidator.category, async (req, res) => {
  try {
    let { success, message, data } = await categoryService.create(
      req.file,
      req.body
    );

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", categoryValidator.category, async (req, res) => {
  try {
    let { success, message, data } = await categoryService.update(
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
    let { success, message, data } = await categoryService.softDelete(
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
    let { success, message, data } = await categoryService.list(
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
