import CRUD_Course from "../sevices/CRUD_Course";
let create_Course = async (req, res) => {
    let Course = await CRUD_Course.createCourse(req.body);
    res.status(200).json(Course);
};

let getAll_Course = async (req, res) => {
    let Course = await CRUD_Course.getAllCourse();
    res.status(200).json(Course);
};
let getBy_Course = async (req, res) => {
    let Course = await CRUD_Course.getCourseBy(req.body);
    res.status(200).json(Course);
};

let find_Course = async (req, res) => {
    let Course = await CRUD_Course.findCourse(req.body);
    res.status(200).json(Course);
};

let delete_Course = async (req, res) => {
    let Course = await CRUD_Course.deleteCourse(req.params);
    res.status(200).json(Course);
};

let update_Course = async (req, res) => {
    let Course = await CRUD_Course.updateCourse(req.body);
    res.status(200).json(Course);
};
let get_CourseBelongType = async (req, res) => {
    let Course = await CRUD_Course.getCourseBeLongType(req.body);
    res.status(200).json(Course);
};

module.exports = {
    create_Course,
    getAll_Course,
    delete_Course,
    update_Course,
    find_Course,
    getBy_Course,
    get_CourseBelongType,
};
