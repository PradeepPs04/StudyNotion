// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")


// ********************************************************************************************************
//                                      Payment routes
// ********************************************************************************************************

// route for capturing and initiating the payment
router.post("/capturePayment", auth, isStudent, capturePayment)

// route to verify signature of razorpay and server
router.post("/verifySignature", verifySignature)

module.exports = router