import CRUD_Consult from "../sevices/CRUD_Consult";
let create_Consult = async (req, res) => {
    let Consult = await CRUD_Consult.createConsult(req.body);
    res.status(200).json(Consult);
};

let getAll_Consult = async (req, res) => {
    let Consult = await CRUD_Consult.getAllConsult();
    res.status(200).json(Consult);
};
let accept_Consult = async (req, res) => {
    let Consult = await CRUD_Consult.handleConsult(req.body);
    res.status(200).json(Consult);
};
module.exports = {
    create_Consult,
    getAll_Consult,
    accept_Consult,
};
