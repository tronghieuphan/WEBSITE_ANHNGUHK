import CRUD_Classify from "../sevices/CRUD_Classify";
let create_Classify = async (req, res) => {
    let Classify = await CRUD_Classify.createClassify(req.body);
    res.status(200).json(Classify);
};

let getAll_Classify = async (req, res) => {
    let Classify = await CRUD_Classify.getAllClassify();
    res.status(200).json(Classify);
};

let delete_Classify = async (req, res) => {
    let Classify = await CRUD_Classify.deleteClassify(req.params);
    res.status(200).json(Classify);
};

let update_Classify = async (req, res) => {
    let Classify = await CRUD_Classify.updateClassify(req.body);
    res.status(200).json(Classify);
};

module.exports = {
    create_Classify,
    getAll_Classify,
    delete_Classify,
    update_Classify,
};
