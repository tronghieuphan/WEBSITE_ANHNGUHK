import express from "express";
import db from "../models/index";
import randomId from "./randomId";
//Hiển thị tất cả
let getAllWeekday = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listWeekday = await db.weekday.findAll({
                order: [["createdAt", "ASC"]],
            });
            if (listWeekday.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listWeekday,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

//Thêm dối tượng
let createWeekday = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Weekday = await db.weekday.findOrCreate({
                where: {
                    nameWeekday: data.nameWeekday,
                },
                defaults: {
                    id: randomId.randomId("T_"),
                },
            });

            if (Weekday[1]) {
                resolve({ message: "Create Successfully", data: Weekday[0] });
            } else {
                resolve({ message: "Weekday Exist" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deleteWeekday = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dk = await db.detailClassesWeek.findAll({
                where: {
                    weekdayId: data.id,
                },
            });
            if (dk.length > 0) {
                resolve({ message: "Exits" });
            } else {
                let del = await db.weekday.destroy({
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
let updateWeekday = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let update = await db.weekday.update(
                {
                    nameWeekday: data.nameWeekday,
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
        0;
    });
};

module.exports = {
    createWeekday,
    getAllWeekday,
    deleteWeekday,
    updateWeekday,
};
