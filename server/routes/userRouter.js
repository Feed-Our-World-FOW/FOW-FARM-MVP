const express = require("express")
const {
  signup,
  login
} = require("../controllers/authControllers.js")
const {
  getAllUser,
  getSingleUser
} = require("../controllers/userControllers.js")

const router = express.Router()

router
  .route("/signup")
    .post(signup)

router
  .route("/login")
    .post(login)

router
  .route("/")
    .get(getAllUser)

router
  .route("/:id")
    .get(getSingleUser)

module.exports = router
