import express from "express";
import db from "../models/index";
import { Op } from "sequelize";
import randomId from "./randomId";
import emailService from "./sendEmail";
//Hiển thị tất cả

let getAllClasses = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listClasses = await db.classes.findAll({
                include: [
                    {
                        model: db.weekday,
                        attributes: ["nameWeekday"],
                    },
                ],
                order: [["createdAt", "ASC"]],
                nest: true,
            });

            let list = [];
            let lecture = await db.user.findAll({
                where: {
                    typeUser: "2",
                },
            });

            let lectureClass = [];
            listClasses.map((item) => {
                lecture.map((item1) => {
                    if (item.lectureId === item1.id) {
                        let obj = {
                            classesId: item.id,
                            nameLecture: item1.firstName + item1.lastName,
                        };
                        lectureClass.push(obj);
                    }
                });
            });

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
                    endDate: item.endDate,
                    startHour: item.startHour,
                    endHour: item.endHour,
                    quantity: item.quantity,
                    quantityRes: item.quantityRes,
                    quantityMin: item.quantityMin,
                    active: item.active,
                    courseId: item.courseId,
                    lectureId: item.lectureId,
                    nameLecture: lectureClass[index].nameLecture,
                    weekdayId: list[index],
                };
                listCalender.push(obj);
            });

            if (listClasses.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listCalender,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getFindAllClasses = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            let listClasses = await db.classes.findAll({
                where: {
                    courseId: data.courseId,
                },
                include: [
                    {
                        model: db.weekday,
                        attributes: ["nameWeekday"],
                    },
                ],

                nest: true,
            });

            let list = [];
            let lecture = await db.user.findAll({
                where: {
                    typeUser: "2",
                },
            });

            let lectureClass = [];
            listClasses.map((item) => {
                lecture.map((item1) => {
                    if (item.lectureId === item1.id) {
                        let obj = {
                            classesId: item.id,
                            nameLecture: item1.firstName + item1.lastName,
                        };
                        lectureClass.push(obj);
                    }
                });
            });

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
                    endDate: item.endDate,
                    startHour: item.startHour,
                    endHour: item.endHour,
                    quantity: item.quantity,
                    quantityRes: item.quantityRes,
                    quantityMin: item.quantityMin,
                    active: item.active,
                    courseId: item.courseId,
                    lectureId: item.lectureId,
                    nameLecture: lectureClass[index].nameLecture,
                    weekdayId: list[index],
                };
                listCalender.push(obj);
            });

            if (listClasses.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listCalender,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getAllClassesByTeacher = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userLec = await db.user.findOne({
                where: {
                    id: data.id,
                },
            });
            if (userLec.typeUser === "2") {
                let listClassesLec = await db.classes.findAll({
                    where: { lectureId: data.id },
                    include: [
                        {
                            model: db.weekday,
                            attributes: ["nameWeekday"],
                        },
                    ],

                    nest: true,
                });
                let list = [];
                listClassesLec.map((item) => {
                    let listWeekday = [];
                    item.weekdays.map((item1) => {
                        listWeekday.push(item1.nameWeekday);
                    });
                    list.push(listWeekday);
                });

                let listCalender = [];
                let obj = {};
                listClassesLec.map((item, index) => {
                    obj = {
                        id: item.id,
                        nameClasses: item.nameClasses,
                        startDate: item.startDate,
                        endDate: item.endDate,
                        startHour: item.startHour,
                        endHour: item.endHour,
                        quantity: item.quantity,
                        quantityRes: item.quantityRes,
                        active: item.active,
                        courseId: item.courseId,
                        lectureId: item.lectureId,
                        weekdayId: list[index],
                    };

                    listCalender.push(obj);
                });
                let objEx = {
                    lecture: userLec.firstName + userLec.lastName,
                    data: listCalender,
                };
                resolve({ message: "Successfully", data: objEx });
            } else {
                let listClasses = await db.classes.findAll({
                    include: [
                        {
                            model: db.weekday,
                            attributes: ["nameWeekday"],
                        },
                    ],

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
                        endDate: item.endDate,
                        startHour: item.startHour,
                        endHour: item.endHour,
                        quantity: item.quantity,
                        quantityRes: item.quantityRes,
                        active: item.active,
                        courseId: item.courseId,
                        lectureId: item.lectureId,
                        weekdayId: list[index],
                    };
                    listCalender.push(obj);
                });

                resolve({
                    message: "Successfully",
                    data: { data: listCalender },
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

//Thêm
let createClasses = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Classes = await db.classes.findOrCreate({
                where: {
                    nameClasses: data.nameClasses,
                },
                defaults: {
                    id: randomId.randomId("LH"),
                    startDate: data.startDate,
                    endDate: data.endDate,
                    startHour: data.startHour,
                    endHour: data.endHour,
                    quantity: data.quantity,
                    quantityRes: 0,
                    quantityMin: data.quantityMin,
                    active: 1,
                    courseId: data.courseId,
                    lectureId: data.lectureId,
                },
            });
            if (Classes[1]) {
                data.nameWeekday.map(async (a) => {
                    await db.detailClassesWeek.create({
                        weekdayId: a,
                        classesId: Classes[0].id,
                    });
                });
                resolve({ message: "Create Successfully", data: Classes[0] });
            } else {
                resolve({ message: "Classes Exist" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa
let deleteClasses = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let del = await db.classes.destroy({
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
let updateClasses = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let update = await db.classes.update(
                {
                    nameClasses: data.nameClasses,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    startHour: data.startHour,
                    endHour: data.endHour,
                    quantity: data.quantity,
                    quantityMin: data.quantityMin,
                    courseId: data.courseId,
                    lectureId: data.lectureId,
                    active: data.active,
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
let findClasses = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.classes.findAll({
                where: {
                    nameClasses: datafind.datafind,
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

//
let findInfoClasses = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.classes.findOne({
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

let listStudentClasses = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.classes.findOne({
                include: [{ model: db.user }],
                where: {
                    id: datafind.datafind,
                },
            });
            if (data) {
                resolve({ message: "Find Successfully", data: data.users });
            } else {
                resolve({ message: "Find Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let sendEmailCalenderClass = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.classes.findOne({
                include: [{ model: db.user }],
                where: {
                    id: datafind.datafind,
                },
            });
            let listEmail = [];
            data.users.map((item) => {
                listEmail.push(item.email);
            });
            let data1 = await db.classes.findOne({
                include: [{ model: db.weekday }],
                where: {
                    id: datafind.datafind,
                },
            });
            let day = [];

            data1.weekdays.map((item) => {
                day.push(item.nameWeekday);
            });

            let obj = {
                nameClasses: data.nameClasses,
                startDate: data.startDate,
                endDate: data.endDate,
                startHour: data.startHour,
                endHour: data.endHour,
                day: day,
                list: listEmail,
            };
            let mail = await sendCalender(obj);
            if (mail.message === "1") {
                resolve({ message: "Send Successfully" });
            } else {
                resolve({ message: "Send Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let sendCalender = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            emailService.sendCalenderClass(data);
            resolve({ message: "1" });
        } catch (e) {
            reject(e);
        }
    });
};
let moveStudent = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.code === "1") {
                let find = await db.classes.findOne({
                    where: {
                        id: data.idClasses,
                    },
                });
                let findClasses = await db.classes.findAll({
                    where: {
                        courseId: find.courseId,
                        active: true,
                        id: { [Op.not]: data.idClasses },
                    },
                    include: [
                        {
                            model: db.weekday,
                            attributes: ["nameWeekday"],
                        },
                    ],

                    nest: true,
                });

                let list = [];

                findClasses.map((item) => {
                    let listWeekday = [];
                    item.weekdays.map((item1) => {
                        listWeekday.push(item1.nameWeekday);
                    });
                    list.push(listWeekday);
                });

                let listCalender = [];
                let obj = {};
                findClasses.map((item, index) => {
                    obj = {
                        id: item.id,
                        nameClasses: item.nameClasses,
                        startDate: item.startDate,
                        endDate: item.endDate,
                        startHour: item.startHour,
                        endHour: item.endHour,
                        quantity: item.quantity,
                        quantityRes: item.quantityRes,
                        quantityMin: item.quantityMin,
                        active: item.active,
                        courseId: item.courseId,
                        lectureId: item.lectureId,
                        weekdayId: list[index],
                    };
                    listCalender.push(obj);
                });
                resolve({ data: listCalender });
            } else if (data.code === "2") {
                await db.detailClassesStudent.update(
                    {
                        classesId: data.id,
                    },
                    {
                        where: {
                            classesId: data.idClassesOld,
                            studentId: data.idStudent,
                        },
                    }
                );

                await db.classes.increment({ quantityRes: 1 }, { where: { id: data.id } });
                await db.classes.decrement(
                    { quantityRes: 1 },
                    { where: { id: data.idClassesOld } }
                );

                resolve({ message: "Move Successfully" });
            } else if (data.code === "3") {
                console.log(data);
                await db.detailClassesStudent.destroy({
                    where: {
                        studentId: data.studentId,
                        classesId: data.classesId,
                    },
                });
                let a = await db.user.findOne({
                    include: [
                        {
                            model: db.registration,
                            include: [{ model: db.course }],
                        },
                    ],

                    where: {
                        id: data.studentId,
                    },
                });
                let findCourse = await db.classes.findOne({
                    where: {
                        id: data.classesId,
                    },
                });
                let obj;
                a.registrations.map((item) => {
                    item.courses.map((item1) => {
                        if (item1.id === findCourse.courseId) {
                            obj = item;
                        }
                    });
                });
                await db.detailRegistration.destroy({
                    where: {
                        registerId: obj.id,
                        courseId: obj.courses[0].id,
                    },
                });

                let up = await db.detailRegistration.findAll({
                    where: {
                        registerId: obj.id,
                    },
                });
                let total = 0;
                up.forEach((item) => {
                    let temp = item.amountCourse + item.priceDiscount;
                    total = total + temp;
                });
                if (total > 0) {
                    let updateres = await db.registration.update(
                        {
                            total: total,
                        },
                        {
                            where: { id: obj.id },
                        }
                    );
                } else {
                    await db.registration.destroy({
                        where: {
                            id: obj.id,
                        },
                    });
                }
                resolve({ message: "Cancel Successfully", data: total });
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createClasses,
    getAllClasses,
    deleteClasses,
    updateClasses,
    findClasses,
    findInfoClasses,
    getFindAllClasses,
    listStudentClasses,
    sendEmailCalenderClass,
    getAllClassesByTeacher,
    moveStudent,
};
