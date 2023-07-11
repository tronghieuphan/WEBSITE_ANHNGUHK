import CRUD_Outstanding from "../sevices/CRUD_Outstanding";
let create_Outstanding = async (req, res) => {
    let Outstanding = await CRUD_Outstanding.createOutstanding(req.body);
    res.status(200).json(Outstanding);
};

let getAll_Outstanding = async (req, res) => {
    let Outstanding = await CRUD_Outstanding.getAllOutstanding();
    res.status(200).json(Outstanding);
};

let delete_Outstanding = async (req, res) => {
    let Outstanding = await CRUD_Outstanding.deleteOutstanding(req.params);
    res.status(200).json(Outstanding);
};

let update_Outstanding = async (req, res) => {
    let Outstanding = await CRUD_Outstanding.updateOutstanding(req.body);
    res.status(200).json(Outstanding);
};

module.exports = {
    create_Outstanding,
    getAll_Outstanding,
    delete_Outstanding,
    update_Outstanding,
};
