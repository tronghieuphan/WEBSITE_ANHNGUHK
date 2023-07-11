"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("outstandings", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(8),
            },
            point: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            studentId: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },
            typeId: {
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
        await queryInterface.dropTable("outstandings");
    },
};
