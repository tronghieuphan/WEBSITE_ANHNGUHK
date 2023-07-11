import express from "express";
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

module.exports = {
    createConsult,
    getAllConsult,
    handleConsult,
};
