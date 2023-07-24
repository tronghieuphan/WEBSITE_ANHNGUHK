import express from "express";
import db from "../models/index";
import { Op } from "sequelize";

import randomId from "./randomId";

//Hiển thị tất cả
let getAllCourse = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listCourse = await db.course.findAll({
                include: [
                    { model: db.discount, attribute: "percent" },
                    { model: db.type },
                    { model: db.classify },
                ],
                order: [["createdAt", "ASC"]],


            });
            if (listCourse.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listCourse,
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
let createCourse = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Course = await db.course.findOrCreate({
                where: {
                    nameCourse: data.nameCourse,
                },
                defaults: {
                    id: randomId.randomId("KH"),
                    lesson: data.lesson,
                    price: data.price,
                    desClassify: data.desClassify,
                    desTarget: data.desTarget,
                    desTime: data.desTime,
                    desPrice: data.desPrice,
                    active: true,
                    listening: data.listening,
                    reading: data.reading,
                    writing: data.writing,
                    speaking: data.speaking,
                    grammer: data.grammer,
                    vocabulary: data.vocabulary,
                    classifyId: data.classifyId,
                    discountId: data.discountId,
                    typeId: data.typeId,
                },
            });
            if (Course[1]) {
                resolve({ message: "Create Successfully", data: Course[0] });
            } else {
                resolve({ message: "Course Exist" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deleteCourse = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let del = await db.course.destroy({
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
let updateCourse = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let update = await db.course.update(
                {
                    nameCourse: data.nameCourse,
                    lesson: data.lesson,
                    price: data.price,
                    desClassify: data.desClassify,
                    desTarget: data.desTarget,
                    desTime: data.desTime,
                    desPrice: data.desPrice,
                    listening: data.listening,
                    reading: data.reading,
                    writing: data.writing,
                    speaking: data.speaking,
                    grammer: data.grammer,
                    vocabulary: data.vocabulary,
                    active: data.active,
                    classifyId: data.classifyId,
                    discountId: data.discountId,
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

//Tìm theo tên
let findCourse = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.course.findOne({
                include: [{ model: db.classes }],
                where: {
                    id: datafind.datafind,
                },
                nest: true,
            });

            let idClasses = [];
            data?.classes?.map((item) => {
                idClasses.push(item.id);
            });
            let listClasses = await db.classes.findAll({
                include: [
                    {
                        model: db.weekday,
                        attributes: ["nameWeekday"],
                    },
                ],
                where: {
                    id: idClasses,
                    active: 1,
                },
                nest: true,
            });

            let list = [];
            listClasses.map((item) => {
                let listWeekday = [];
                item.weekdays.map((item1) => {
                    listWeekday.push(item1.nameWeekday);
                });
                list.push(listWeekday);
            });

            let listCalender = [];
            let obj = {};
            listClasses.map((item, index) => {
                obj = {
                    id: item.id,
                    nameClasses: item.nameClasses,
                    startDate: item.startDate,
                    date: item.startDate + " - " + item.endDate,
                    hour: item.startHour + " - " + item.endHour,
                    quantity: item.quantity,
                    quantityRes: item.quantityRes,
                    active: item.active,
                    courseId: item.courseId,
                    lectureId: item.lectureId,
                    weekdayId: list[index],
                };
                listCalender.push(obj);
            });
            resolve({ message: "Find Successfully", data: data, data1: listCalender });
        } catch (e) {
            reject(e);
        }
    });
};

//Tìm theo tên khóa học xử lý phiếu đăng ký
let getCourseBy = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.course.findOne({
                include: [{ model: db.discount, attribute: ["percent"] }],
                where: {
                    id: datafind.datafind,
                },
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
let getCourseBeLongType = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data;
            if (datafind.code === "admin") {
                data = await db.type.findAll({
                    include: [{ model: db.course }],
                });
            } else {
                data = await db.course.findAll({
                    include: [{ model: db.discount, attribute: ["percent"] }, { model: db.type }],
                    where: {
                        typeId: datafind.datafind,
                        active: 1,
                    },
                });
            }
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

module.exports = {
    createCourse,
    getAllCourse,
    deleteCourse,
    updateCourse,
    findCourse,
    getCourseBy,
    getCourseBeLongType,
};
