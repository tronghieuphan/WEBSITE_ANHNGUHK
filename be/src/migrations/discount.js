"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("discounts", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(8),
            },

            nameDiscount: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            percent: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            code: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            startDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            endDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
           
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable("discounts");
    },
};
