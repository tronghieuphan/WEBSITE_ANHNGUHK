"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(8),
            },
            firstName: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            gender: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            dateBirth: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            phone: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
            street: {
                type: Sequelize.STRING(30),
            },
            ward: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            district: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            workPlace: {
                type: Sequelize.STRING(100),
            },
            position: {
                type: Sequelize.STRING(30),
            },
            degree: {
                type: Sequelize.STRING,
            },
            experience: {
                type: Sequelize.STRING,
            },
            specialize: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            typeUser: {
                type: Sequelize.STRING(1),
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
            },
            department: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            image: {
                type: Sequelize.TEXT,
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            passWord: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("users");
    },
};
