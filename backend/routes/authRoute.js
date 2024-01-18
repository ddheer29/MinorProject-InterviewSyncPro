const express = require('express')
const router = express.Router();
const { registerController, loginController, getuserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/userModel');
//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// Get loggedin User details using POST "/api/auth/getuser". Login required
router.post("/getuser", authMiddleware, getuserController);
module.exports = router;