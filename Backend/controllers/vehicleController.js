const db = require("../config/db");

const getVehicles = (req, res) => {
    db.query("SELECT * FROM vehicles", (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
};

module.exports = { getVehicles };