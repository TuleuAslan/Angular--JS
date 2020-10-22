// import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
    //   up: async (queryInterface: QueryInterface, Sequelize) => {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            "users",
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    unique: true,
                    allowNull: false,
                    primaryKey: true,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: { type: Sequelize.STRING, allowNull: false },
                registered: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            },
            {
                collate: "utf8_general_ci", // collation, MYSQL only
            }
        );
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable("users");
    },
};
