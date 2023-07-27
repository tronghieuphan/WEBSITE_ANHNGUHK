import express from "express";
import db from "../models/index";
import randomId from "./randomId";
import uploadImage from "./uploadImage";

//Hiển thị
let getAllType = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listType = await db.type.findAll({
                order: [["createdAt", "ASC"]],
            });
            if (listType.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listType,
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
let createType = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imgupload = await uploadImage(data.image, id);

            let Type = await db.type.findOrCreate({
                where: {
                    nameType: data.nameType,
                },
                defaults: {
                    id: randomId.randomId("L_"),
                    description: data.description,
                    image: imgupload.url,
                },
            });
            if (Type[1]) {
                resolve({ message: "Create Successfully", data: Type[0] });
            } else {
                resolve({ message: "Type Exist" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deleteType = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dkcourse = await db.course.findAll({
                where: {
                    typeId: data.id,
                },
            });
            let dkdocument = await db.document.findAll({
                where: {
                    typeId: data.id,
                },
            });
            let dkout = await db.outstanding.findAll({
                where: {
                    typeId: data.id,
                },
            });
            if (dkcourse.length > 0 || dkdocument.length > 0 || dkout.length > 0) {
                resolve({ message: "Exits" });
            } else {
                let del = await db.type.destroy({
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
let updateType = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imgupload = await uploadImage(data.image, data.id);

            let update = await db.type.update(
                {
                    nameType: data.nameType,
                    description: data.description,
                    image: imgupload.url,
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
    createType,
    getAllType,
    deleteType,
    updateType,
};
