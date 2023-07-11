import CRUD_Discount from "../sevices/CRUD_Discount";
let create_Discount = async (req, res) => {
    let Discount = await CRUD_Discount.createDiscount(req.body);
    res.status(200).json(Discount);
};
let find_Discount = async (req, res) => {
    let Discount = await CRUD_Discount.findDiscount(req.query);
    res.status(200).json(Discount);
};
let getAll_Discount = async (req, res) => {
    let Discount = await CRUD_Discount.getAllDiscount();
    res.status(200).json(Discount);
};
let getAll_DiscountActive = async (req, res) => {
    let Discount = await CRUD_Discount.getAllDiscountActive();
    res.status(200).json(Discount);
};

let delete_Discount = async (req, res) => {
    let Discount = await CRUD_Discount.deleteDiscount(req.params);
    res.status(200).json(Discount);
};

let update_Discount = async (req, res) => {
    let Discount = await CRUD_Discount.updateDiscount(req.body);
    res.status(200).json(Discount);
};

module.exports = {
    create_Discount,
    getAll_Discount,
    delete_Discount,
    update_Discount,
    find_Discount,
    getAll_DiscountActive,
};
