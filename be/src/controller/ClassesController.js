import CRUD_Classes from "../sevices/CRUD_Classes";
let create_Classes = async (req, res) => {
    let Classes = await CRUD_Classes.createClasses(req.body);
    res.status(200).json(Classes);
};
let getAll_Classes = async (req, res) => {
    let Classes = await CRUD_Classes.getAllClasses();
    res.status(200).json(Classes);
};
let delete_Classes = async (req, res) => {
    let Classes = await CRUD_Classes.deleteClasses(req.params);
    res.status(200).json(Classes);
};
let update_Classes = async (req, res) => {
    let Classes = await CRUD_Classes.updateClasses(req.body);
    res.status(200).json(Classes);
};
let find_InfoClasses = async (req, res) => {
    let Classes = await CRUD_Classes.findInfoClasses(req.body);
    res.status(200).json(Classes);
};
let get_ListStudentClasses = async (req, res) => {
    let Classes = await CRUD_Classes.listStudentClasses(req.body);
    res.status(200).json(Classes);
};
let send_EmailCalender = async (req, res) => {
    let Classes = await CRUD_Classes.sendEmailCalenderClass(req.body);
    res.status(200).json(Classes);
};
let getAll_ByTeacher = async (req, res) => {
    let Classes = await CRUD_Classes.getAllClassesByTeacher(req.body);
    res.status(200).json(Classes);
};
let move_Student = async (req, res) => {
    let Classes = await CRUD_Classes.moveStudent(req.body);
    res.status(200).json(Classes);
};
module.exports = {
    create_Classes,
    getAll_Classes,
    delete_Classes,
    update_Classes,
    find_InfoClasses,
    get_ListStudentClasses,
    send_EmailCalender,
    getAll_ByTeacher,
    move_Student,
};
