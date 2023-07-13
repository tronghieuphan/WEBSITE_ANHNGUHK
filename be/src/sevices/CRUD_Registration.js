import express from "express";
import db from "../models/index";
import randomId from "./randomId";
import uploadImage from "./uploadImage";
import emailService from "./sendEmail";
import userCRUD from "./CRUD_User";
//Hiển thị tất cả
let getAllRegistration = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listRegistration = await db.registration.findAll({
                include: [{ model: db.user, attributes: ["firstName", "lastName"] }],
                nest: true,
                raw: true,
            });
            if (listRegistration.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listRegistration,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Hiển thị phiếu đăng ký theo id
let getRegistrationBy = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data?.id) {
                let listRegistration = await db.registration.findOne({
                    where: {
                        id: data.id,
                    },
                    include: [{ model: db.course }, { model: db.user }],
                    nest: true,
                });

                resolve({
                    message: "List Successfully",
                    data: listRegistration,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

//Thêm dối tượng
let createRegistration = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const id = await randomId.randomId("DK");
            const datenow = new Date();
            let classesStudent;

            let listClass = await db.classes.findAll({
                where: {
                    id: data.classesId,
                },
            });
            let temp = 0;
            listClass.forEach((item) => {
                if (item.courseId === data.courseId[0]) {
                    temp += 1;
                }
            });
            if (temp > 1) {
                resolve({ message: "Resgister Only Class Belong Course" });
            } else {
                let listCourse = await db.detailClassesStudent.findAll({
                    where: {
                        classesId: data.classesId,
                        studentId: data.studentId,
                    },
                });
                if (listCourse.length > 0) {
                    resolve({ message: "Course Registed", data: listCourse });
                } else {
                    data.classesId.map(async (a) => {
                        classesStudent = await db.detailClassesStudent.findOrCreate({
                            where: {
                                studentId: data.studentId,
                                classesId: a,
                            },
                        });
                        if (classesStudent[1]) {
                            let findquantityRes = await db.detailClassesStudent.findAll({
                                where: {
                                    classesId: a,
                                },
                            });
                            await db.classes.update(
                                {
                                    quantityRes: findquantityRes.length,
                                },
                                {
                                    where: {
                                        id: a,
                                    },
                                }
                            );
                            let classes = await db.classes.findOne({
                                where: {
                                    id: a,
                                },
                            });
                            if (classes.quantity === classes.quantityRes) {
                                await db.classes.update(
                                    {
                                        active: false,
                                    },
                                    {
                                        where: {
                                            id: a,
                                        },
                                    }
                                );
                            }
                        } else {
                            resolve({ message: "Exits" });
                        }
                    });
                    let amount = 0;
                    let price_discount = 0;
                    const list = await db.course.findAll({
                        where: { id: data.courseId },
                        include: [{ model: db.discount, attributes: ["percent"] }],
                        raw: true,
                        nest: true,
                    });
                    list.forEach((item) => {
                        price_discount = (item.price * item?.discount?.percent) / 100;
                        amount += item.price - price_discount;
                    });

                    let Registration = await db.registration.create({
                        id: id,
                        regisDate: datenow,
                        total: amount,
                        method: data.method,
                        studentId: data.studentId,
                        staffRegis: data.staffRegis,
                        staffPayment: data.staffPayment,
                        active: 0,
                    });

                    data.courseId.map(async (a) => {
                        const info = await db.course.findOne({
                            where: {
                                id: a,
                            },
                            include: [{ model: db.discount, attributes: ["percent"] }],
                            raw: true,
                            nest: true,
                        });

                        let priceDiscount = (info.price * info.discount.percent) / 100;
                        let amount = info.price - priceDiscount;

                        await db.detailRegistration.create({
                            registerId: id,
                            courseId: a,
                            priceDiscount: priceDiscount,
                            amountCourse: amount,
                            quantity: 1,
                        });
                    });
                    await userCRUD.updateActive({ id: data.studentId });
                    resolve({ message: "Create Successfully", data: Registration[0] });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

//Cập nhập
let updateRegistration = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            let findDetail = await db.detailRegistration.destroy({
                where: {
                    registerId: data.id,
                },
            });

            let updateres = db.registration.update(
                {
                    total: (data.total * 20) / 100,
                    activeCancel: 1,
                },
                {
                    where: { id: data.id },
                }
            );
            resolve({ message: "Update Successfully" });
        } catch (e) {
            reject(e);
        }
    });
};
let acceptPayment = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const datenow = new Date();

            let update = await db.registration.update(
                {
                    paymentDate: datenow,
                    staffPayment: data.staffPayment,
                    active: 1,
                },
                {
                    where: {
                        id: data.id,
                    },
                }
            );
            resolve({ message: "Accept Successfully", data });
        } catch (e) {
            reject(e);
        }
    });
};

let sendMailRegis = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let student = await db.user.findOne({
                where: {
                    id: data.email,
                },
            });
            let imgupload = await uploadImage(data.image, student.lastName);
            let obj = {
                email: student.email,
                image: imgupload.url,
            };
            await emailService.sendRegistation(obj);
            resolve({ message: "Send Successfully" });
        } catch (e) {
            reject(e);
        }
    });
};

let getCourseByRes = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.course.findOne({
                include: [{ model: db.discount, attributes: ["percent"] }],
                where: {
                    id: datafind.datafind,
                },
                raw: true,
                nest: true,
            });
            let priceDiscount = (data.price * data.discount.percent) / 100;
            let amount = data.price - priceDiscount;
            let data1 = await db.course.findOne({
                include: [{ model: db.classes }],

                where: {
                    id: datafind.datafind,
                },
                nest: true,
            });
            let dataEx = {
                ...data,
                priceDiscount: priceDiscount,
                amount: amount,
                classes: data1.classes,
            };
            if (data) {
                resolve({ message: "Find Successfully", data: dataEx });
            } else {
                resolve({ message: "Find Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let checkClassesCourse = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listCourse = await db.course.findAll({
                include: [{ model: db.classes }],
                where: {
                    id: data,
                },
            });

            let listClasses = [];
            listCourse.forEach((item) => {
                listClasses.push(item.classes);
            });
            let listClassesCourse = [];
            listClasses.forEach((item, index) => {
                let obj = {
                    nameCourse: listCourse[index].nameCourse,
                    // listClass: item,
                };
                let arr = [];
                item.map((item1) => {
                    if (item1.active) {
                        arr.push(item1);
                    }
                });
                obj["listClass"] = arr;

                listClassesCourse.push(obj);
            });
            if (data) {
                resolve({
                    message: "Check Successfully",
                    data: listClassesCourse,
                });
            } else {
                resolve({ message: "Find Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let checkClasses = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listClass = await db.classes.findAll({
                where: {
                    id: data.classesId,
                },
            });
            let temp = 0;
            listClass.forEach((item) => {
                if (item.courseId === data.courseId[0]) {
                    temp += 1;
                }
            });
            if (temp > 1) {
                resolve({ message: "Resgister Only Class Belong Course" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createRegistration,
    getAllRegistration,
    updateRegistration,
    getCourseByRes,
    acceptPayment,
    getRegistrationBy,
    sendMailRegis,
    checkClassesCourse,
    checkClasses,
};
