import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface UserAttirbutes {
  id: number;
  username: string;
  password: string;
  registered: Date;
}

export interface UserCreateAttributes
  extends Optional<UserAttirbutes, "id" | "registered"> {}

export class User
  extends Model<UserAttirbutes, UserCreateAttributes>
  implements UserAttirbutes {
  id!: number;
  username!: string;
  password!: string;
  registered!: Date;
}

export function userModelInit(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      username: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      registered: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => new Date(),
      },
    },
    { sequelize: sequelize, tableName: "users", timestamps: false }
  );
}
