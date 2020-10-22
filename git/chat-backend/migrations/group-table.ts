// import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    //   up: async (queryInterface: QueryInterface, Sequelize) => {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "groups",
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    unique: true,
                    allowNull: false,
                    primaryKey: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                description: {
                    type: Sequelize.STRING,
                },
            },
            {
                collate: "utf8_general_ci", // collation, MYSQL only
            }
        );
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable("groups");
    },
};
