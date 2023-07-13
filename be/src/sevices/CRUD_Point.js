import express from "express";
import db from "../models/index";
import randomId from "./randomId";
import { where, Op } from "sequelize";
import emailService from "./sendEmail";

//Hiển thị
let getAllPoint = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listPoint = await db.point.findAll();
            if (listPoint.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listPoint,
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
let createPoint = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listStudent = await db.detailClassesStudent.findAll({
                where: {
                    classesId: data.data,
                },
            });
            let list;
            listStudent.map(async (item) => {
                list = await db.point.create({
                    id: randomId.randomId("D_"),
                    numberPoint: 0,
                    result: "",
                    studentId: item.studentId,
                    classesId: item.classesId,
                });
            });
            resolve({ message: "Create Successfully", data: listStudent });
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deletePoint = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let del = await db.point.destroy({
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
let updatePoint = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let pointtotal =
                new Number(data.skillSpeaking ? data.skillSpeaking : 0) +
                new Number(data.skillReading ? data.skillReading : 0) +
                new Number(data.skillWriting ? data.skillWriting : 0) +
                new Number(data.skillListening ? data.skillListening : 0);

            console.log("pointtotal: ", pointtotal);
            let update = await db.point.update(
                {
                    numberPoint: pointtotal,
                    result: data.result,
                    skillListening: data.skillListening,
                    skillReading: data.skillReading,
                    skillSpeaking: data.skillSpeaking,
                    skillWriting: data.skillWriting,
                    studentId: data.studentId,
                    classesId: data.classesId,
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
let findPoint = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.point.findAll({
                where: {
                    classesId: datafind.datafind,
                },
                include: [{ model: db.user, attributes: ["firstName", "lastName"] }],
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
//Tìm theo tên hoặc loại
let getListPointClass = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.classes.findOne({
                include: [{ model: db.point }],
                where: {
                    id: datafind.datafind,
                },
            });

            if (data) {
                resolve({ message: "Find Successfully", data: data.points });
            } else {
                resolve({ message: "Find Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

//Tìm theo tên hoặc loại
let sendMailPoint = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let find = await db.point.findAll({
                where: {
                    classesId: data.id,
                },
                include: [
                    {
                        model: db.classes,
                        attributes: ["nameClasses"],
                    },
                    { model: db.user, attributes: ["firstName", "lastName", "email"] },
                ],
            });
            find.map(async (item) => {
                let obj = {
                    numberPoint: item.numberPoint,
                    result: 1 ? "Đạt" : "Không đạt",
                    skillReading: item.skillReading,
                    skillListening: item.skillListening,
                    skillWriting: item.skillWriting,
                    skillSpeaking: item.skillSpeaking,
                    nameClasses: item.class.nameClasses,
                    name: item.user.firstName + " " + item.user.lastName,
                    email: item.user.email,
                };
                await emailService.sendPoint(obj);
            });

            resolve({ data: find, message: "Send Successfully" });
        } catch (e) {
            reject(e);
        }
    });
};

let findPointStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data1 = await db.user.findOne({
                where: {
                    id: data.studentId,
                },
                include: [{ model: db.classes, attributes: ["courseId"] }],
            });
            let data2 = await db.classes.findAll({
                where: {
                    courseId: data.courseId,
                },
            });
            let classCourse = {};
            data2.map((item) => {
                data1.classes.map((item1) => {
                    if (item1.detailClassesStudent.classesId === item.id) {
                        classCourse = item;
                    }
                });
            });
            let pointstuclass = await db.point.findOne({
                where: {
                    [Op.and]: [{ studentId: data.studentId }, { classesId: classCourse.id }],
                },
            });
            if (data1) {
                resolve({
                    message: "Find Successfully",
                    point: pointstuclass,
                });
            } else {
                resolve({ message: "Find Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createPoint,
    getAllPoint,
    deletePoint,
    updatePoint,
    findPoint,
    getListPointClass,
    findPointStudent,
    sendMailPoint,
};
