const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserService = require("../../Services/User/user.service");
const userValidator = require("../../Controller/User/user.validator");
const CONFIG = require("../../../config/config");
const getToken = require("../../../helper/authGaurd");

// this get call occurs after the user clicks on the link which was sent in the email
router.get("/verify/:id", async (req, res) => {
  try {
    const { success, message, data } = await UserService.Exists({
      _id: req.params.id,
    });
    if (success) {
      const updateResponse = await UserService.update(req.params.id, {
        isActive: true,
      });
      if (updateResponse.success) {
        res.status(200).json({ ...updateResponse, data: null });
      } else {
        res.status(400).json({
          success: updateResponse.success,
          message: updateResponse.message,
          data: updateResponse.data,
        });
      }
    } else {
      res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/signup", userValidator.signup, async (req, res) => {
  try {
    let { success, message, data } = await UserService.create(req.body);

    if (success) {
      return res.status(200).json({ success, message, data });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    let { success, message, data } = await UserService.Exists({
      email: email.trim(),
    });

    if (success) {
      const isValidPassword = await bcrypt.compare(password, data.password);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: "Passsword not matching",
          data: null,
        });
      }

      const token = getToken.createToken(data._id, email);
      const body = {
        id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        token: token,
      };
      return res.status(200).json({ success, message, data: body });
    } else {
      return res.status(400).json({ success, message, data });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { success, message, data } = await UserService.Exists({
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

router.patch("/:id", userValidator.signup, async (req, res) => {
  try {
    let { success, message, data } = await UserService.update(
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
    let { success, message, data } = await UserService.softDelete(
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
    let { success, message, data } = await UserService.list(
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
// router.post("/", async (req, res) => {});
module.exports = router;

// router.post("/signin", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     let { success, message, data } = await UserService.Exists({
//       email: email.trim(),
//     });

//     if (success) {
//       console.log(data);
//       const isValidPassword = await bcrypt.compare(password, data.password);
//       console.log(isValidPassword);
//       if(!isValidPassword) {
//         return res.status(400).json({
//           success: false,
//           message: '',
//           data: null
//         })
//       }

//     } else {
//       return res.status(400).json({ success, message, data });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// });
