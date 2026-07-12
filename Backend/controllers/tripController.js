const db = require("../config/db");

// Get all trips
const getTrips = (req, res) => {
    const sql = `
        SELECT
            trips.*,
            vehicles.vehicle_name,
            drivers.driver_name
        FROM trips
        JOIN vehicles ON trips.vehicle_id = vehicles.id
        JOIN drivers ON trips.driver_id = drivers.id
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
};

// Add trip
const addTrip = (req, res) => {
    const {
        vehicle_id,
        driver_id,
        source,
        destination,
        cargo_weight,
        trip_date,
        status
    } = req.body;

    const sql = `
        INSERT INTO trips
        (vehicle_id, driver_id, source, destination,
        cargo_weight, trip_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            vehicle_id,
            driver_id,
            source,
            destination,
            cargo_weight,
            trip_date,
            status
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Trip created successfully",
                id: result.insertId
            });
        }
    );
};

module.exports = {
    getTrips,
    addTrip
};