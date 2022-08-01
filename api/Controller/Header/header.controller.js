const express = require("express");
const router = express.Router();
const headerService = require("../../Services/Header/header.service");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/header");
  },
  filename: function (req, file, cb) {
    cb(null, "header-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});

const uploadImg = multer({ storage: storage }).single("headerImg");

router.post("/", uploadImg, async (req, res) => {
  try {
    let { success, message, data } = await headerService.create(
      req.body,
      req.file
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

router.get("/:id", async (req, res) => {
  try {
    let { success, message, data } = await headerService.Exists({
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

router.post("/list", async (req, res) => {
  try {
    let { success, message, data } = await headerService.list(
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

router.post('/chnage refelct check',async (req, res) => {
  try {
    let { success, message, data } = await headerService.list(
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
} ) 

module.exports = router;
