import Dashboard from "../sevices/getDataDashboard";

let getAll = async (req, res) => {
    let dashboard = await Dashboard.getAll();
    res.status(200).json(dashboard);
};
module.exports = {
    getAll,
};
