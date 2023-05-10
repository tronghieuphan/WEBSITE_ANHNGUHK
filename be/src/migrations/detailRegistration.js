"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("detailRegistrations", {
            paymentDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            note: {
                type: Sequelize.TEXT,
                allowNull: false,
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
