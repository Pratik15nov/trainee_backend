const express = require("express");
const router = express.Router();
const categoryService = require("../../Services/Category/category.service");

// Get One
router.get("/", async (req, res) => {
  res.send(req.body);
});

// router.post("/", uploadImg, async (req, res) => {
//   // console.log(req.file);
//   const data = new catogoryModal({
//     categoryName: req.body.categoryName,
//     categoryImg: req.file.path,
//     isActive: true,
//   });
//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/category");
  },
  filename: function (req, file, cb) {
    cb(null, "category-" + Date.now() + "." + file.originalname.split(".")[1]);
  },
});
const uploadImg = multer({ storage: storage }).single("image");

router.post("/Add", uploadImg, async (req, res) => {
  try {
    let { success } = await categoryService.create(req.body);
    console.log("SUCCESS", success);
    if (success) {
      return res.status(200).json("CATEGORY ADDED SUCCESFULLY");
    } else {
      return res.status(400).json("CATEGORY NOT ADDED");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     let { success } = await UserService.Exists({
//       email: email.trim(),
//       password: password.trim(),
//     });
//     if (success) {
//       return res.status(200).json("USER FOUND SUCCESFULLY");
//     } else {
//       return res.status(400).json("USER NOT FOUND");
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.patch("/:id", async (req, res) => {});

// router.delete("/:id", async (req, res) => {});

module.exports = router;
