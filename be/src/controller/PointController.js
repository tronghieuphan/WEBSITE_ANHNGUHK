import CRUD_Point from "../sevices/CRUD_Point";
let create_Point = async (req, res) => {
    let Point = await CRUD_Point.createPoint(req.body);
    res.status(200).json(Point);
};

let getAll_Point = async (req, res) => {
    let Point = await CRUD_Point.getAllPoint();
    res.status(200).json(Point);
};

let delete_Point = async (req, res) => {
    let Point = await CRUD_Point.deletePoint(req.params);
    res.status(200).json(Point);
};

let update_Point = async (req, res) => {
    let Point = await CRUD_Point.updatePoint(req.body);
    res.status(200).json(Point);
};
let find_Point = async (req, res) => {
    let Point = await CRUD_Point.findPoint(req.body);
    res.status(200).json(Point);
};
let get_ListPointClass = async (req, res) => {
    let Point = await CRUD_Point.getListPointClass(req.body);
    res.status(200).json(Point);
};
let find_PointStudent = async (req, res) => {
    let Point = await CRUD_Point.findPointStudent(req.body);
    res.status(200).json(Point);
};

module.exports = {
    create_Point,
    getAll_Point,
    delete_Point,
    update_Point,
    find_Point,
    get_ListPointClass,
    find_PointStudent,
};
