const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

// router for deleting user account
router.delete("/deleteProfile", auth, deleteAccount)

// router for updating user profile
router.put("/updateProfile", auth, updateProfile)

// router for getting user details
router.get("/getUserDetails", auth, getAllUserDetails)

// router for getting all enrolled course of user
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

// router for updating  profile picture of user
router.put("/updateDisplayPicture", updateDisplayPicture)

module.exports = router