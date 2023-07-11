"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("detailRegistrations", {
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            priceDiscount: {
                type: Sequelize.INTEGER,
            },
            amountCourse: {
                type: Sequelize.INTEGER,
            },
            registerId: {
                type: Sequelize.STRING(8),
                allowNull: false,
                primaryKey: true,
            },
            courseId: {
                type: Sequelize.STRING(8),
                allowNull: false,
                primaryKey: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("detailRegistrations");
    },
};
