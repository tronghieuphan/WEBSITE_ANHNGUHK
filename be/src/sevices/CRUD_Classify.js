import express from "express";
import db from "../models/index";
import randomId from "./randomId";

//Hiển thị tất cả
let getAllClassify = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listClassify = await db.classify.findAll({
                order: [["createdAt", "ASC"]],
            });
            if (listClassify.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listClassify,
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
let createClassify = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Classify = await db.classify.findOrCreate({
                where: {
                    nameClassify: data.nameClassify,
                },
                defaults: {
                    id: randomId.randomId("DT"),
                },
            });
            if (Classify[1]) {
                resolve({ message: "Create Successfully", data: Classify[0] });
            } else {
                resolve({ message: "Classify Exist" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deleteClassify = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let del = await db.classify.destroy({
                where: {
                    id: data.id,
                },
            });
            if (del === 1) {
                resolve({ message: "Delete Successfully" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Cập nhập
let updateClassify = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let update = await db.classify.update(
                {
                    nameClassify: data.nameClassify,
                },
                {
                    where: {
                        id: data.id,
                    },
                }
            );
            console.log(update);
            resolve({ message: "Update Successfully", data: update });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createClassify,
    getAllClassify,
    deleteClassify,
    updateClassify,
};
