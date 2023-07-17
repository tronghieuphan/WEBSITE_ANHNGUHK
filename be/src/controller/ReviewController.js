import CRUD_Review from "../sevices/CRUD_Review";

let getAll_Review = async (req, res) => {
    let Review = await CRUD_Review.getAllReview();
    res.status(200).json(Review);
};
let get_Review = async (req, res) => {
    let Review = await CRUD_Review.getReview();
    res.status(200).json(Review);
};
let create_Review = async (req, res) => {
    let Review = await CRUD_Review.createReview(req.body);
    res.status(200).json(Review);
};
let delete_Review = async (req, res) => {
    let Review = await CRUD_Review.deleteReview(req.params);
    res.status(200).json(Review);
};

let update_Review = async (req, res) => {
    let Review = await CRUD_Review.updateReview(req.body);
    res.status(200).json(Review);
};

let find_Review = async (req, res) => {
    let Review = await CRUD_Review.findReview(req.body);
    res.status(200).json(Review);
};

module.exports = {
    getAll_Review,
    get_Review,
    create_Review,
    delete_Review,
    update_Review,
    find_Review,
};
