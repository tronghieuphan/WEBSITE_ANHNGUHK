import express from "express";
import db from "../models/index";

//Hiển thị tất cả
let getAll = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.user.findAll();
            let student = 0;
            let customer = 0;
            let lecture = 0;
            let staff = 0;
            let admin = 0;
            user.forEach((item) => {
                if (item.typeUser === "0") {
                    customer += 1;
                } else if (item.typeUser === "1") {
                    student += 1;
                } else if (item.typeUser === "2") {
                    lecture += 1;
                } else if (item.typeUser === "3") {
                    staff += 1;
                } else if (item.typeUser === "4") {
                    admin += 1;
                }
            });

            let book = await db.document.findAll();
            let consult = await db.consult.findAll();
            let consultNot = await db.consult.findAll({
                where: {
                    active: "0",
                },
            });
            let cost = await db.registration.findAll();
            let detail = await db.detailRegistration.findAll();
            let total = 0;
            cost.forEach((item) => {
                total += item.total;
            });

            let month = [];

            detail.forEach((item) => {
                const m = new Date(item.createdAt).getMonth();
                month.push(m + 1);
            });

            const uniqueSet = new Set(month);
            const time = [...uniqueSet].sort();

            let discount = [];
            let amount = [];
            let totalres = [];

            time.forEach((item) => {
                let pricediscount = 0;
                let priceamount = 0;

                detail.forEach((item1) => {
                    let month = new Date(item1.createdAt).getMonth();
                    if (item === month + 1) {
                        pricediscount += item1.priceDiscount;
                        priceamount += item1.amountCourse;
                    }
                });
                let total = priceamount + pricediscount;
                discount.push(pricediscount);
                amount.push(priceamount);
                totalres.push(total);
            });
            let obj = {
                user: user.length,
                book: book.length,
                consult: consult.length,
                consultNot: consultNot.length,
                price: total,
                objuser: [customer, student, lecture, staff, admin],
                month: time,
                dis: discount,
                amo: amount,
                tol: totalres,
            };
            resolve({
                data: obj,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getAll,
};
