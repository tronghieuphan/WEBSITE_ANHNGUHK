import express from "express";
import db from "../models/index";
import randomId from "./randomId";

//Hiển thị
let getAllDiscount = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listDiscount = await db.discount.findAll({
                order: [["createdAt", "ASC"]],
            });
            if (listDiscount.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listDiscount,
                });
            } else {
                resolve({ message: "List null" });
            }
            handleDate();
        } catch (e) {
            reject(e);
        }
    });
};
let getAllDiscountActive = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listDiscount = await db.discount.findAll({
                where: {
                    active: 1,
                },
            });
            if (listDiscount.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listDiscount,
                });
            } else {
                resolve({ message: "List null" });
            }
            handleDate();
        } catch (e) {
            reject(e);
        }
    });
};
//Thêm
let createDiscount = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let condition1 = await db.discount.findAll({
                where: {
                    code: data.code,
                },
            });
            if (condition1.length) {
                resolve({ message: "Code Exist" });
            } else {
                let Discount = await db.discount.findOrCreate({
                    where: {
                        nameDiscount: data.nameDiscount,
                    },
                    defaults: {
                        id: randomId.randomId("KM"),
                        percent: data.percent,
                        code: data.code,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        description: data.description,
                        active: false,
                    },
                });
                if (Discount[1]) {
                    resolve({ message: "Create Successfully", data: Discount[0] });
                } else {
                    resolve({ message: "Discount Exist" });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deleteDiscount = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let find = await db.discount.findOne({
                where: {
                    id: data.id,
                },
            });
            if (find.active) {
                resolve({ message: "Couldn't Delete" });
            } else {
                let del = await db.discount.destroy({
                    where: {
                        id: data.id,
                    },
                });
                if (del === 1) {
                    resolve({ message: "Delete Successfully" });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Cập nhập
let updateDiscount = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let update = await db.discount.update(
                {
                    nameDiscount: data.nameDiscount,
                    percent: data.percent,
                    code: data.code,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    description: data.description,
                    active: data.active,
                },
                {
                    where: {
                        id: data.id,
                    },
                }
            );
            resolve({ message: "Update Successfully", data: update });
        } catch (e) {
            reject(e);
        }
    });
};
//Tìm theo tên hoặc loại
let findDiscount = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.discount.findAll({
                where: {
                    [Op.or]: [
                        {
                            nameDiscount: datafind.datafind,
                        },
                        {
                            code: datafind.datafind,
                        },
                    ],
                },
            });

            if (data) {
                resolve({ message: "Find Successfully", data: data });
            } else {
                resolve({ message: "Find Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let handleDate = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            let listDiscount = await db.discount.findAll({
                include: [{ model: db.course }],
            });
            listDiscount.forEach(async (item) => {
                let end_Date = new Date(item.endDate);
                let dayend = end_Date.getDate();
                let monthend = end_Date.getMonth();
                let yearend = end_Date.getFullYear();
                if (day > dayend || month > monthend || year > yearend) {
                    await db.discount.update(
                        {
                            active: false,
                        },
                        {
                            where: {
                                id: item.id,
                            },
                        }
                    );
                    item.courses.map(async (item1) => {
                        await db.course.update(
                            {
                                discountId: "",
                            },
                            {
                                where: {
                                    id: item1.id,
                                },
                            }
                        );
                    });
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createDiscount,
    getAllDiscount,
    deleteDiscount,
    updateDiscount,
    findDiscount,
    getAllDiscountActive,
};
