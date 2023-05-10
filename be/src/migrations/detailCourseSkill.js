"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("detailCourseSkills", {
            courseId: {
                type: Sequelize.STRING(8),
                allowNull: false,
                primaryKey: true,
            },
            skillId: {
                type: Sequelize.STRING(8),
                allowNull: false,
                primaryKey: true,
            },
            description:{
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable("detailCourseSkills");
    },
};
