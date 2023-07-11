import express from "express";
import db from "../models/index";
import { Op } from "sequelize";
import randomId from "./randomId";

//Hiển thị tất cả

let createReview = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listReview = await db.review.create({
                id: randomId.randomId("DG"),
                description: data.description,
                star: data.star,
                active: 0,
                studentId: data.studentId,
            });

            resolve({
                message: "Create Successfully",
                data: listReview,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getAllReview = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listReview = await db.review.findAll({
                include: [
                    { model: db.user, attributes: ["firstName", "lastName", "workPlace", "image"] },
                ],
            });
            if (listReview.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listReview,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getReview = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listReview = await db.review.findAll({
                where: {
                    active: 1,
                },

                include: [
                    { model: db.user, attributes: ["firstName", "lastName", "workPlace", "image"] },
                ],
            });
            if (listReview.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listReview,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deleteReview = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let del = await db.review.destroy({
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

//Xóa
let updateReview = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let review = await db.review.update(
                {
                    active: data.active,
                },
                {
                    where: {
                        id: data.id,
                    },
                }
            );
            resolve({ message: "Update Successfully" });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAllReview,
    getReview,
    createReview,
    deleteReview,
    updateReview,
};
