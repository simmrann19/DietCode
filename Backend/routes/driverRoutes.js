const express = require("express");
const router = express.Router();

const {
    getDrivers,
    addDriver
} = require("../controllers/driverController");

router.get("/", getDrivers);
router.post("/", addDriver);

module.exports = router;