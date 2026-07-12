const db = require("../config/db");

const getVehicles = (req, res) => {
    db.query("SELECT * FROM vehicles", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
};
const addVehicle = (req, res) => {
    const {
        registration_number,
        vehicle_name,
        vehicle_type,
        max_load_capacity,
        odometer,
        acquisition_cost,
        status
    } = req.body;

    const sql = `
        INSERT INTO vehicles
        (registration_number, vehicle_name, vehicle_type,
        max_load_capacity, odometer, acquisition_cost, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            registration_number,
            vehicle_name,
            vehicle_type,
            max_load_capacity,
            odometer,
            acquisition_cost,
            status
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Vehicle added successfully",
                id: result.insertId
            });
        }
    );
};

module.exports = {
    getVehicles,
    addVehicle
};