import CRUD_Weekday from "../sevices/CRUD_Weekday";
let create_Weekday = async (req, res) => {
    let Weekday = await CRUD_Weekday.createWeekday(req.body);
    res.status(200).json(Weekday);
};

let getAll_Weekday = async (req, res) => {
    let Weekday = await CRUD_Weekday.getAllWeekday();
    res.status(200).json(Weekday);
};

let delete_Weekday = async (req, res) => {
    let Weekday = await CRUD_Weekday.deleteWeekday(req.params);
    res.status(200).json(Weekday);
};

let update_Weekday = async (req, res) => {
    let Weekday = await CRUD_Weekday.updateWeekday(req.body);
    res.status(200).json(Weekday);
};

module.exports = {
    create_Weekday,
    getAll_Weekday,
    delete_Weekday,
    update_Weekday,
};
