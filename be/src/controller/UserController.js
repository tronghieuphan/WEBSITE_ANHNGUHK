import CRUD_User from "../sevices/CRUD_User";
let create_User = async (req, res) => {
    let User = await CRUD_User.createUser(req.body);
    res.status(200).json(User);
};
let create_UserAdmin = async (req, res) => {
    let User = await CRUD_User.createUserAdmin(req.body);
    res.status(200).json(User);
};

let getAll_User = async (req, res) => {
    let User = await CRUD_User.getAllUser();
    res.status(200).json(User);
};
let getUser_By = async (req, res) => {
    let User = await CRUD_User.getUserBy(req.body);
    res.status(200).json(User);
};
let getAll_ByType = async (req, res) => {
    let User = await CRUD_User.getAllUserByType(req.body);
    res.status(200).json(User);
};
let find_User = async (req, res) => {
    let User = await CRUD_User.findUser(req.body);
    res.status(200).json(User);
};
let find_UserById = async (req, res) => {
    let User = await CRUD_User.findUserById(req.body);
    res.status(200).json(User);
};

let delete_User = async (req, res) => {
    let User = await CRUD_User.deleteUser(req.params);
    res.status(200).json(User);
};

let update_User = async (req, res) => {
    let User = await CRUD_User.updateUser(req.body);
    res.status(200).json(User);
};
let login_User = async (req, res) => {
    let User = await CRUD_User.loginAccount(req.body);
    res.status(200).json(User);
};
let forget_Password = async (req, res) => {
    let User = await CRUD_User.forgetPassword(req.body);
    res.status(200).json(User);
};

let changePass_User = async (req, res) => {
    let User = await CRUD_User.changePassword(req.body);
    res.status(200).json(User);
};

let changePassForget_User = async (req, res) => {
    let User = await CRUD_User.changePasswordForget(req.body);
    res.status(200).json(User);
};
let update_Active = async (req, res) => {
    let User = await CRUD_User.updateActive(req.body);
    res.status(200).json(User);
};
let student_Res = async (req, res) => {
    let Registrafind = await CRUD_User.studentRes(req.body);
    res.status(200).json(Registrafind);
};
let find_ByTypeUser = async (req, res) => {
    let User = await CRUD_User.findTypeByUser(req.body);
    res.status(200).json(User);
};

module.exports = {
    create_User,
    create_UserAdmin,
    getAll_User,
    delete_User,
    update_User,
    find_User,
    getAll_ByType,
    login_User,
    changePass_User,
    getUser_By,
    find_UserById,
    update_Active,
    forget_Password,
    changePassForget_User,
    student_Res,
    find_ByTypeUser,
};
