import CRUD_Type from "../sevices/CRUD_Type";
let create_Type = async (req, res) => {
    let Type = await CRUD_Type.createType(req.body);
    res.status(200).json(Type);
};

let getAll_Type = async (req, res) => {
    let Type = await CRUD_Type.getAllType();
    res.status(200).json(Type);
};

let delete_Type = async (req, res) => {
    let Type = await CRUD_Type.deleteType(req.params);
    res.status(200).json(Type);
};

let update_Type = async (req, res) => {
    let Type = await CRUD_Type.updateType(req.body);
    res.status(200).json(Type);
};

module.exports = {
    create_Type,
    getAll_Type,
    delete_Type,
    update_Type,
};
