"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("documents", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(8),
            },
            nameDocument: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            author: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            releaseDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            download: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            filepdf: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            fileview: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            level: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            similarTopic: {
                type: Sequelize.INTEGER,
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
        await queryInterface.addIndex("documents", {
            fields: [{ name: "nameDocument", length: 100 }],
            type: "FULLTEXT",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("documents");
    },
};
