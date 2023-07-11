import express, { request } from "express";
import db from "../models/index";
import randomId from "./randomId";
import emailService from "./sendEmail";

//Hiển thị tất cả
let getAllConsult = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listConsult = await db.consult.findAll({
                include: [
                    { model: db.user, attributes: ["firstName", "lastName", "phone", "email"] },
                    { model: db.classes, attributes: ["nameClasses"] },
                ],
                nest: true,
                raw: true,
            });

            let list = [];
            listConsult.map((item) => {
                let obj = {
                    ...item,
                    classRoom: item.class.nameClasses,
                };
                list.push(obj);
            });
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
                    datenow.getDate() == dateArrive.getDate() &&
                    datenow.getMonth() == dateArrive.getMonth() &&
                    datenow.getFullYear() == dateArrive.getFullYear()
                ) {
                    let classesid = await db.classes.findOne({
                        where: {
                            id: item.classesId,
                        },
                    });
                    let objmail = {
                        ...item,
                        fullname: user.firstName + " " + user.lastName,
                        email: user.email,
                        classes: classesid.nameClasses,
                    };
                    await emailService.AlertDateConsult(objmail);
                } else if (
                    datefuture.getDate() == dateArrive.getDate() &&
                    datefuture.getMonth() == dateArrive.getMonth() &&
                    datefuture.getFullYear() == dateArrive.getFullYear()
                ) {
                    let objmail = {
                        fullname: user.firstName + " " + user.lastName,
                        email: user.email,
                    };
                    await db.consult.destroy({
                        where: {
                            id: item.id,
                        },
                    });
                    await emailService.CancelConsult(objmail);
                }
            });
            resolve({ data: data });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createConsult,
    getAllConsult,
    handleConsult,
    handleDateWait,
};
