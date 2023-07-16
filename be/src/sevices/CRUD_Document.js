import express from "express";
import db from "../models/index";
import { Op } from "sequelize";
import randomId from "./randomId";
import uploadImage from "./uploadImage";
import uploadFile from "./uploadFile";
import Sequelize from "sequelize";

//Hiển thị tất cả
let getAllDocument = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listDocument = await db.document.findAll({
                include: [{ model: db.type }],
                raw: true,
                order: [["createdAt", "ASC"]],

            });
            if (listDocument.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listDocument,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getAllDocumentByType = async (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listDocument = [];
            if (datafind.datafind === "") {
                listDocument = await db.document.findAll();
            } else {
                listDocument = await db.document.findAll({
                    where: {
                        typeId: datafind.datafind,
                    },
                });
            }
            if (listDocument.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listDocument,
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
let createDocument = async (data, filepdf) => {
    return new Promise(async (resolve, reject) => {
        try {
            let id = await randomId.randomId("SA");
            let imgupload = await uploadImage(data.image, id);
            let fileupload = await uploadFile(filepdf, id);
            let Document = await db.document.findOrCreate({
                where: {
                    nameDocument: data.nameDocument,
                },
                defaults: {
                    id: id,
                    author: data.author,
                    releaseDate: data.releaseDate,
                    image: imgupload.url,
                    filepdf: fileupload.dol,
                    fileview: fileupload.view,
                    description: data.description,
                    download: 0,
                    similarTopic: data.similarTopic,
                    level: data.level,
                    typeId: data.typeId,
                },
            });

            if (Document[1]) {
                resolve({ message: "Create Successfully", data: Document[0] });
            } else {
                resolve({ message: "Document Exist" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deleteDocument = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let del = await db.document.destroy({
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
let updateDocument = async (data, filepdf) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imgupload = await uploadImage(data.image, data.id);
            let fileupload = await uploadFile(filepdf, data.id);
            let update = await db.document.update(
                {
                    nameDocument: data.nameDocument,
                    author: data.author,
                    releaseDate: data.releaseDate,
                    image: imgupload.url,
                    fileview: fileupload.view,
                    filepdf: fileupload.dol,
                    description: data.description,
                    similarTopic: data.similarTopic,
                    level: data.level,
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

let increaseDowload = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let find = await db.document.findOne({
                where: {
                    nameDocument: data.nameDocument,
                },
            });
            let dowl = await db.document.update(
                {
                    download: find.download + 1,
                },
                {
                    where: {
                        nameDocument: data.nameDocument,
                    },
                }
            );
            resolve({ message: "Update Successfully", data: dowl });
        } catch (e) {
            reject(e);
        }
    });
};

//Tìm theo tên hoặc loại
let findDocument = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.document.findAll({
                where: {
                    [Op.or]: [
                        {
                            nameDocument: datafind.datafind,
                        },
                        {
                            typeId: datafind.datafind,
                        },
                    ],
                },
            });
            let dataone = await db.document.findOne({
                include: [{ model: db.type }],
                nest: true,
                raw: true,
                where: {
                    nameDocument: datafind.datafind,
                },
            });

            if (data) {
                resolve({ message: "Find Successfully", data: data, dataone: dataone });
            } else {
                resolve({ message: "Find Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let findDocumentFullText = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doc = await db.document.findAll({
                where:
                    // nameDocument: { [Op.substring]: data.nameDocument },
                    data.nameDocument &&
                    Sequelize.literal(
                        `MATCH(document.nameDocument) AGAINST ('${data.nameDocument}' IN NATURAL LANGUAGE MODE)`
                    ),
            });
            resolve({ data: doc });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createDocument,
    getAllDocument,
    deleteDocument,
    updateDocument,
    findDocument,
    increaseDowload,
    getAllDocumentByType,
    findDocumentFullText,
};
