const express = require("express")

const {
  getAllFarms,
  createFarm,
  getSingleFarm,
  updateFarm,
  deleteFarm,
  getFarmStats,
} = require("../controllers/FarmControllers.js")
const {
  protect
} = require("../controllers/authControllers.js")

const router = express.Router()

router.route("/farm-stats").get(getFarmStats)

router
  .route("/")
    .get(protect, getAllFarms)
    .post(createFarm)


router
  .route("/:id")
    .get(getSingleFarm)
    .patch(updateFarm)
    .delete(deleteFarm)

module.exports = router
