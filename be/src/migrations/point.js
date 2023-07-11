"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("points", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(8),
            },

            numberPoint: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            result: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            studentId: {
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
        await queryInterface.dropTable("points");
    },
};
