import CRUD_Consult from "../sevices/CRUD_Consult";
let create_Consult = async (req, res) => {
    let Consult = await CRUD_Consult.createConsult(req.body);
    res.status(200).json(Consult);
};

let getAll_Consult = async (req, res) => {
    let Consult = await CRUD_Consult.getAllConsult(req.body);
    res.status(200).json(Consult);
};

let get_CheckStaffConsult = async (req, res) => {
    let Consult = await CRUD_Consult.handleCheckCounsut(req.body);
    res.status(200).json(Consult);
};
let accept_Consult = async (req, res) => {
    let Consult = await CRUD_Consult.handleConsult(req.body);
    res.status(200).json(Consult);
};let accept_ResConsult = async (req, res) => {
    let Consult = await CRUD_Consult.handleResConsult(req.body);
    res.status(200).json(Consult);
};
let dateWait_Consult = async (req, res) => {
    let Consult = await CRUD_Consult.handleDateWait();
    res.status(200).json(Consult);
};
let update_Consult = async (req, res) => {
    let Consult = await CRUD_Consult.updateConsult(req.body);
    res.status(200).json(Consult);
};

module.exports = {
    create_Consult,
    update_Consult,
    getAll_Consult,
    accept_Consult,
    get_CheckStaffConsult,
    dateWait_Consult,accept_ResConsult
};
