import express from "express";
import db from "../models/index";
import randomId from "./randomId";
import uploadImage from "./uploadImage";

//Hiển thị
let getAllOutstanding = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listOutstanding = await db.outstanding.findAll({
                include: [{ model: db.type }, { model: db.user }],
                nest: true,
                raw: true,
            });

            if (listOutstanding.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listOutstanding,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

//Thêm
let createOutstanding = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let id = await randomId.randomId("NB");
            let imgupload = await uploadImage(data.image, id);
            let Outstanding = await db.outstanding.findOrCreate({
                where: {
                    studentId: data.studentId,
                },
                defaults: {
                    id: id,
                    point: data.point,
                    image: imgupload.url,
                    studentId: data.studentId,
                    typeId: data.typeId,
                },
            });
            if (Outstanding[1]) {
                resolve({ message: "Create Successfully", data: Outstanding[0] });
            } else {
                resolve({ message: "Outstanding Exist" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deleteOutstanding = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let del = await db.outstanding.destroy({
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
let updateOutstanding = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imgupload = await uploadImage(data.image, data.id);
            let update = await db.outstanding.update(
                {
                    point: data.point,
                    image: imgupload.url,
                    studentId: data.studentId,
                    typeId: data.typeId,
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

module.exports = {
    createOutstanding,
    getAllOutstanding,
    deleteOutstanding,
    updateOutstanding,
};
