"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("consults", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(8),
            },

            target: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            timeComplete: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            dateArrive: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            timeArrive: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            note: {
                type: Sequelize.TEXT,
            },
            pointTest: {
                type: Sequelize.STRING(20),
            },
            level: {
                type: Sequelize.STRING(25),
            },
            checkRes: {
                type: Sequelize.BOOLEAN,
            },
            userId: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            classesId: {
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
        await queryInterface.dropTable("consults");
    },
};
