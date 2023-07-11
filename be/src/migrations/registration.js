"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("registrations", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(8),
            },
            regisDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            total: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            paymentDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            method: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            note: {
                type: Sequelize.TEXT,
            },
            studentId: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            staffRegis: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            staffPayment: {
                type: Sequelize.STRING(8),
                allowNull: false,
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
        await queryInterface.dropTable("registrations");
    },
};
