import CRUD_Registration from "../sevices/CRUD_Registration";
let create_Registration = async (req, res) => {
    let Registration = await CRUD_Registration.createRegistration(req.body);
    res.status(200).json(Registration);
};

let getAll_Registration = async (req, res) => {
    let Registration = await CRUD_Registration.getAllRegistration();
    res.status(200).json(Registration);
};
let get_RegistrationBy = async (req, res) => {
    let Registration = await CRUD_Registration.getRegistrationBy(req.body);
    res.status(200).json(Registration);
};
let check_ClassesCourse = async (req, res) => {
    let Registration = await CRUD_Registration.checkClassesCourse(req.body);
    res.status(200).json(Registration);
};
let update_Registration = async (req, res) => {
    let Registration = await CRUD_Registration.updateRegistration(req.body);
    res.status(200).json(Registration);
};
let find_Registration = async (req, res) => {
    let Registrafind = await CRUD_Registration.findRegistrafind(req.query);
    res.status(200).json(Registrafind);
};
let getBy_CourseRes = async (req, res) => {
    let Registrafind = await CRUD_Registration.getCourseByRes(req.body);
    res.status(200).json(Registrafind);
};
let accept_Payment = async (req, res) => {
    let Registrafind = await CRUD_Registration.acceptPayment(req.body);
    res.status(200).json(Registrafind);
};
let send_MailRegis = async (req, res) => {
    let Registrafind = await CRUD_Registration.sendMailRegis(req.body);
    res.status(200).json(Registrafind);
};
let check_Classes = async (req, res) => {
    let Registrafind = await CRUD_Registration.checkClasses(req.body);
    res.status(200).json(Registrafind);
};


module.exports = {
    create_Registration,
    getAll_Registration,
    get_RegistrationBy,
    update_Registration,
    find_Registration,
    getBy_CourseRes,
    accept_Payment,
    send_MailRegis,
    check_ClassesCourse,
    check_Classes,

};
