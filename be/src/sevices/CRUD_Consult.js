import express, { request } from "express";
import db from "../models/index";
import randomId from "./randomId";
import emailService from "./sendEmail";
import timeDataArrive from "./data";
//Hiển thị tất cả
let getAllConsult = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listConsult = await db.consult.findAll({
                include: [
                    { model: db.user, attributes: ["firstName", "lastName", "phone", "email"] },
                    { model: db.classes, attributes: ["nameClasses"] },
                ],
                where: {},
                order: [["createdAt", "ASC"]],

                nest: true,
                raw: true,
            });
            let list = [];
            if (data.choose === 3) {
                listConsult.map((item) => {
                    let obj = {
                        ...item,
                        classRoom: item.class.nameClasses,
                    };
                    list.push(obj);
                });
            } else {
                let now;
                if (data.choose === 1) {
                    now = new Date();
                } else if (data.choose === 2) {
                    now = new Date(new Date().setDate(new Date().getDate() + 1));
                } else if (data.choose === 4) {
                    now = new Date(data.datechoose);
                }
                listConsult.map((item) => {
                    let arrDate = new Date(item.dateArrive);
                    if (
                        arrDate.getDate() === now.getDate() &&
                        arrDate.getMonth() === now.getMonth() &&
                        arrDate.getFullYear() === now.getFullYear()
                    ) {
                        let obj = {
                            ...item,
                            classRoom: item.class.nameClasses,
                        };
                        list.push(obj);
                    }
                });
            }
            if (listConsult.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: list,
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
let createConsult = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let idconsult = randomId.randomId("TV");
            let Consult = await db.consult.create({
                id: idconsult,
                target: data.target,
                timeComplete: data.timeComplete,
                dateArrive: data.dateArrive,
                timeArrive: data.timeArrive,
                active: 0,
                classesId: data.classesId,
                userId: data.userId,
            });

            let userid = await db.user.findOne({
                where: {
                    id: data.userId,
                },
            });
            let classesid = await db.classes.findOne({
                where: {
                    id: data.classesId,
                },
            });
            let objmail = {
                ...data,
                fullname: userid.firstName + " " + userid.lastName,
                email: userid.email,
                classes: classesid.nameClasses,
            };
            await emailService.sendConsultRes(objmail);
            resolve({ message: "Create Successfully", data: Consult });
        } catch (e) {
            reject(e);
        }
    });
};

//Thêm dối tượng
let updateConsult = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            let Consult = await db.consult.update(
                {
                    note: data.note,
                    pointTest: data.pointTest,
                    level: data.level,
                    checkRes: data.checkRes,
                },
                {
                    where: {
                        id: data.id,
                    },
                }
            );
            resolve({ message: "Update Successfully", data: Consult });
        } catch (e) {
            reject(e);
        }
    });
};

let handleConsult = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let update = await db.consult.update(
                {
                    active: 1,
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
let handleResConsult = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let update = await db.consult.update(
                {
                    checkRes: 1,
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
let handleDateWait = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.consult.findAll({
                include: [{ model: db.user }, { model: db.classes }],
            });
            data.map(async (item) => {
                let datenow = new Date();
                let dateArrive = new Date(item.dateArrive);
                let datefuture = new Date(
                    new Date(item.dateArrive).setDate(new Date(item.dateArrive).getDate() + 5)
                );

                if (
                    datenow.getDate() === dateArrive.getDate() &&
                    datenow.getMonth() === dateArrive.getMonth() &&
                    datenow.getFullYear() === dateArrive.getFullYear() &&
                    item.active === false
                ) {
                    let classesid = await db.classes.findOne({
                        where: {
                            id: item.classesId,
                        },
                    });
                    let objmail = {
                        target: item.target,
                        timeComplete: item.timeComplete,
                        dateArrive: item.dateArrive,
                        timeArrive: item.timeArrive,
                        fullname: item.user.firstName + " " + item.user.lastName,
                        email: item.user.email,
                        classes: classesid.nameClasses,
                    };
                    await emailService.AlertDateConsult(objmail);
                } else if (
                    (datefuture.getDate() < datenow.getDate() ||
                        datefuture.getMonth() < datenow.getMonth()) &&
                    item.active === false
                ) {
                    let objmail = {
                        fullname: item.user.firstName + " " + item.user.lastName,
                        email: item.user.email,
                    };
                    await db.consult.destroy({
                        where: {
                            id: item.id,
                        },
                    });
                    await emailService.CancelConsult(objmail);
                }
            });
            resolve({ message: "Handle Successfully", data: data });
        } catch (e) {
            reject(e);
        }
    });
};
const handleCheckCounsut = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listConsult = await db.consult.findAll({
                where: {
                    dateArrive: data.dateArrive,
                },
            });
            let listTimeTest = [];
            listConsult.map((item) => {
                listTimeTest.push(item.timeArrive);
            });

            let uniquetime = new Set(listTimeTest);
            let listTime = [...uniquetime];

            let exDateTime = [];

            listTime.map((item1) => {
                let length = 0;
                let slip = item1.split(":");
                let x = new Number(slip[0] + slip[2]);
                listConsult.forEach((item2) => {
                    if (item1 === item2.timeArrive) {
                        length += 1;
                    }
                });
                if (length >= 2) {
                    exDateTime.push({ key: x, time: item1, length: length });
                }
            });
            resolve({ data: exDateTime });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createConsult,
    updateConsult,
    getAllConsult,
    handleConsult,
    handleDateWait,
    handleCheckCounsut,
    handleResConsult,
    handleResConsult,
};
