import CRUD_Document from "../sevices/CRUD_Document";
let create_Document = async (req, res) => {
    let Document = await CRUD_Document.createDocument(req.body, req.files);
    res.status(200).json(Document);
};
let getAll_Document = async (req, res) => {
    let Document = await CRUD_Document.getAllDocument();
    res.status(200).json(Document);
};
let getAll_DocumentByType = async (req, res) => {
    let Document = await CRUD_Document.getAllDocumentByType(req.body);
    res.status(200).json(Document);
};
let find_Document = async (req, res) => {
    let Document = await CRUD_Document.findDocument(req.body);
    res.status(200).json(Document);
};
let find_DocumentFullText = async (req, res) => {
    let Document = await CRUD_Document.findDocumentFullText(req.body);
    res.status(200).json(Document);
};

let delete_Document = async (req, res) => {
    let Document = await CRUD_Document.deleteDocument(req.params);
    res.status(200).json(Document);
};

let update_Document = async (req, res) => {
    let Document = await CRUD_Document.updateDocument(req.body, req.files);
    res.status(200).json(Document);
};
let upload_Image = async (req, res) => {
    let Document = await CRUD_Document.updateDocument(req.body);
    res.status(200).json(Document);
};
let upload_Dol = async (req, res) => {
    let Document = await CRUD_Document.increaseDowload(req.body);
    res.status(200).json(Document);
};
module.exports = {
    create_Document,
    getAll_Document,
    delete_Document,
    update_Document,
    find_Document,
    upload_Image,
    getAll_DocumentByType,
    find_DocumentFullText,
    upload_Dol,
};
