import express from "express";
import db from "../models/index";
import randomId from "./randomId";
import { Op, where } from "sequelize";
import uploadImage from "./uploadImage";
import emailService from "./sendEmail";
import { createJWT } from "../middleware/JWTAction";
import bcrypt from "bcrypt";
const salt = 10;

let loginAccount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user.findOne({
                where: {
                    userName: data.userName,
                },
            });

            if (user) {
                let a = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    dateBirth: user.dateBirth,
                    email: user.email,
                    position: user.position,
                    department: user.department,
                    typeUser: user.typeUser,
                    userName: user.userName,
                };
                let userToken = createJWT(a);
                const mk = bcrypt.compareSync(data.passWord, user.passWord);
                if (mk) {
                    resolve({ message: "Login Successfull", data: user, token: userToken });
                } else {
                    resolve({ message: "Fail Password" });
                }
            } else {
                resolve({ message: "Username Not Exist" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let changePassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let mk = await hashPasswordAccount(data.passWord);
            let findAccount = await db.user.findOne({
                where: {
                    userName: data.userName,
                },
            });
            if (findAccount) {
                const check = bcrypt.compareSync(data.oldPassword, findAccount.dataValues.passWord);
                if (check) {
                    let checkChange = bcrypt.compareSync(
                        data.passWord,
                        findAccount.dataValues.passWord
                    );
                    if (checkChange) {
                        resolve({ message: "Not Change" });
                    } else {
                        await db.user.update(
                            {
                                passWord: mk,
                            },
                            {
                                where: {
                                    userName: data.userName,
                                },
                            }
                        );
                        resolve({ message: "Change Succesfull" });
                    }
                } else {
                    resolve({ message: "Change Fail" });
                }
            } else {
                resolve({ message: "Not Exists" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let changePasswordForget = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let mk = await hashPasswordAccount(data.passWord);
            let findAccount = await db.user.findOne({
                where: {
                    email: data.email,
                },
            });
            if (findAccount) {
                await db.user.update(
                    {
                        passWord: mk,
                    },
                    {
                        where: {
                            email: data.email,
                        },
                    }
                );
                resolve({ message: "Change Succesfull" });
            } else {
                resolve({ message: "Not Exists" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Mã hóa mật khẩu
let hashPasswordAccount = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hash(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

//Hiển thị tất cả người dùng
let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let listUser = await db.user.findAll();
            if (listUser.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listUser,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getAllUserByType = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listUser = await db.user.findAll({
                where: {
                    typeUser: data.typeUser,
                },
            });
            if (listUser.length > 0) {
                resolve({
                    message: "List Successfully",
                    data: listUser,
                });
            } else {
                resolve({ message: "List null" });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getUserBy = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let listUser = await db.user.findOne({
                where: {
                    [Op.or]: [{ id: data.datafind }],
                },
                raw: true,
            });
            // if (listUser.length > 0) {
            resolve({
                message: "List Successfully",
                data: listUser,
            });
            // } else {
            //     resolve({ message: "List null" });
            // }
        } catch (e) {
            reject(e);
        }
    });
};
//Thêm người dùng
let createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("data: ", data);
            let condition1 = await db.user.findAll({
                where: {
                    phone: data.phone,
                },
            });
            let condition2 = await db.user.findAll({
                where: {
                    email: data.email,
                },
            });
            let condition3 = await db.user.findAll({
                where: {
                    userName: data.userName,
                },
            });

            if (condition1.length > 0) {
                resolve({ message: "Phone Exist" });
            } else if (condition2.length > 0) {
                resolve({ message: "Email Exist" });
            } else if (condition3.length > 0) {
                resolve({ message: "Username Exist" });
            } else {
                let pass = await hashPasswordAccount(data.passWord);
                let id = await randomId.randomId("ND");
                // let imgupload;
                // if (data.image != null) {
                //     imgupload = await uploadImage(data.image, id);
                // }

                let user = await db.user.findOrCreate({
                    where: {
                        phone: data.phone,
                    },
                    defaults: {
                        id: id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        gender: data.gender,
                        dateBirth: data.dateBirth,
                        email: data.email,
                        street: data.street,
                        ward: data.ward,
                        district: data.district,
                        city: data.city,
                        workPlace: data.workPlace,
                        typeUser: "0", //chú ý
                        image: data.imageava,
                        userName: data.userName,
                        passWord: pass,
                        active: 0,
                    },
                });
                if (user[1]) {
                    resolve({ message: "Create Successfully", data: user[0] });
                } else {
                    resolve({ message: "User Exist" });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

//
const sendPasswordMail = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let password = await randomId.randomString(8);
            let dataSend = {
                receiverEmail: data.email,
                lastName: data.lastName,
                passWord: password,
            };
            await emailService.sendPassEmail(dataSend);
            resolve({ message: "Check Mail", pass: password });
        } catch (e) {
            reject(e);
        }
    });
};
//Thêm người dùng
let createUserAdmin = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("data: ", data);
            let condition1 = await db.user.findAll({
                where: {
                    phone: data.phone,
                },
            });
            let condition2 = await db.user.findAll({
                where: {
                    email: data.email,
                },
            });
            if (condition1.length > 0) {
                resolve({ message: "Phone Exist" });
            } else if (condition2.length > 0) {
                resolve({ message: "Email Exist" });
            } else {
                let sendMail;
                let pass;
                let codeid;
                if (data.typeUser === "1") {
                    codeid = "HV";
                    sendMail = await sendPasswordMail(data);
                    pass = await hashPasswordAccount(sendMail.pass);
                } else if (data.typeUser === "2") {
                    codeid = "GV";
                    pass = await hashPasswordAccount(data.passWord);
                } else if (data.typeUser === "3") {
                    codeid = "NV";
                    pass = await hashPasswordAccount(data.passWord);
                }
                let id = await randomId.randomId(codeid);
                let imgupload = await uploadImage(data.image, id);
                let user = await db.user.findOrCreate({
                    where: {
                        phone: data.phone,
                    },
                    defaults: {
                        id: id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        gender: data.gender,
                        dateBirth: data.dateBirth,
                        email: data.email,
                        street: data.street,
                        ward: data.ward,
                        district: data.district,
                        city: data.city,
                        workPlace: data.workPlace,
                        position: data.position,
                        department: data.department,
                        degree: data.degree,
                        experience: data.experience,
                        specialize: data.specialize,
                        description: data.description,
                        typeUser: data.typeUser,
                        image: imgupload.url,
                        userName: data.userName,
                        passWord: pass,
                        active: 1,
                    },
                });
                if (user[1]) {
                    resolve({ message: "Create Successfully", data: user[0] });
                } else {
                    resolve({ message: "User Exist" });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};
//Xóa người dùng
let deleteUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let del = await db.user.destroy({
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
//Cập nhập người dùng
let updateUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let imgupload;
            if (data.image != null) {
                imgupload = await uploadImage(data.image, data.id);
            }
            let update = await db.user.update(
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    dateBirth: data.dateBirth,
                    email: data.email,
                    street: data.street,
                    ward: data.ward,
                    district: data.district,
                    city: data.city,
                    workPlace: data.workPlace,
                    position: data.position,
                    department: data.department,
                    degree: data.degree,
                    experience: data.experience,
                    specialize: data.specialize,
                    description: data.description,
                    typeUser: data.typeUser,
                    image: data.image === null ? null : imgupload.url,
                },
                {
                    where: {
                        id: data.id,
                    },
                }
            );
            if (update) {
                let obj = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    dateBirth: data.dateBirth,
                    email: data.email,
                    street: data.street,
                    ward: data.ward,
                    phone: data.phone,
                    district: data.district,
                    city: data.city,
                    workPlace: data.workPlace,
                    position: data.position,
                    department: data.department,
                    degree: data.degree,
                    experience: data.experience,
                    specialize: data.specialize,
                    description: data.description,
                    typeUser: data.typeUser,
                    userName: data.userName,
                    image: data.image === null ? null : data.image ? data.image : imgupload.url,
                };
                resolve({ message: "Update Successfully", data: obj });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let updateActive = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            let update = await db.user.update(
                {
                    active: 1,
                    typeUser: "1",
                },
                {
                    where: {
                        id: data.id,
                    },
                }
            );
            let user1 = await db.user.findOne({
                where: {
                    id: data.id,
                },
            });

            let obj = {
                email: user1.email,
                fullname: user1.firstName + " " + user1.lastName,
            };

            await emailService.sendUpdateUser(obj);
            resolve({ message: "Update Successfully", data: update });
        } catch (e) {
            reject(e);
        }
    });
};

//Tìm theo số điện thoại
let findUser = (datafind) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data;
            if (datafind === "") {
                data = await db.user.findAll();
            } else {
                data = await db.user.findAll({
                    where: {
                        [Op.or]: [
                            {
                                phone: { [Op.substring]: datafind.datafind },
                            },
                            {
                                lastName: { [Op.substring]: datafind.datafind },
                            },
                            {
                                email: { [Op.substring]: datafind.datafind },
                            },
                            {
                                userName: datafind.datafind,
                            },
                        ],
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
let findUserById = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let find = await db.user.findOne({
                where: {
                    id: data.id,
                },
            });
            if (find) {
                resolve({ message: "Find Successfully", data: find });
            } else {
                resolve({ message: "Find Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let forgetPassword = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let find = await db.user.findOne({
                where: {
                    email: data.email,
                },
            });
            console.log("find: ", find);

            if (find != null) {
                let codeEmail = await verifyCode(find);
                resolve({ message: "Find Successfully", data: find, codeEmail });
            } else {
                resolve({ message: "Find Fail" });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let verifyCode = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let id = randomId.randomString(6);
            let obj = {
                fullname: data.firstName + " " + data.lastName,
                code: id,
                email: data.email,
            };
            emailService.sendForgetPassword(obj);
            resolve({ message: "Send Successfully", data: obj });
        } catch (e) {
            reject(e);
        }
    });
};

let studentRes = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let student = await db.user.findOne({
                where: {
                    id: data.id,
                },
            });
            let res = await db.registration.findAll({
                where: {
                    studentId: data.id,
                },
                include: [{ model: db.course }],
            });

            let courseRes = [];
            res.map((item) => {
                item.courses.map((item1) => {
                    courseRes.push(item1);
                });
            });
            let list = [];
            res.map((item, index) => {
                let obj = {
                    dateRes: item.regisDate,
                    studentCourse: courseRes[index],
                };
                list.push(obj);
            });

            resolve({ data: list });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createUser,
    createUserAdmin,
    getAllUser,
    deleteUser,
    updateUser,
    findUser,
    getAllUserByType,
    changePassword,
    loginAccount,
    sendPasswordMail,
    getUserBy,
    findUserById,
    updateActive,
    forgetPassword,
    changePasswordForget,
    studentRes,
};
