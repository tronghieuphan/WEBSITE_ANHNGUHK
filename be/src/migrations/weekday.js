"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("weekdays", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(8),
            },
            nameWeekday: {
                type: Sequelize.STRING(10),
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
        await queryInterface.dropTable("weekdays");
    },
};
