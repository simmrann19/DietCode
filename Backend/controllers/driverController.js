const db = require("../config/db");

// GET all drivers
const getDrivers = (req, res) => {
    db.query("SELECT * FROM drivers", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
};

// ADD a driver
const addDriver = (req, res) => {
    const {
        driver_name,
        license_number,
        phone,
        address,
        status
    } = req.body;

    const sql = `
        INSERT INTO drivers
        (driver_name, license_number, phone, address, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            driver_name,
            license_number,
            phone,
            address,
            status
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Driver added successfully",
                id: result.insertId
            });
        }
    );
};

module.exports = {
    getDrivers,
    addDriver
};