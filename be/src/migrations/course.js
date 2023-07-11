"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("courses", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(8),
            },
            nameCourse: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            lesson: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            desTime: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            desPrice: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            desTarget: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            desClassify: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            listening: {
                type: Sequelize.TEXT,
            },
            reading: {
                type: Sequelize.TEXT,
            },
            writing: {
                type: Sequelize.TEXT,
            },
            speaking: {
                type: Sequelize.TEXT,
            },
            grammer: {
                type: Sequelize.TEXT,
            },
            vocabulary: {
                type: Sequelize.TEXT,
            },

            typeId: {
                type: Sequelize.STRING(8),
                allowNull: false,
            },

            classifyId: {
                type: Sequelize.STRING(8),
            },
            discountId: {
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
        await queryInterface.dropTable("courses");
    },
};
