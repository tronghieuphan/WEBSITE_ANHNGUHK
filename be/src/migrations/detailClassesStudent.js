"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("detailClassesStudents", {
            studentId: {
                type: Sequelize.STRING(8),
                allowNull: false,
                primaryKey: true,
            },
            classesId: {
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
        await queryInterface.dropTable("detailClassesStudents");
    },
};
