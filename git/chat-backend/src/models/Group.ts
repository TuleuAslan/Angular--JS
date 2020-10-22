import { DataTypes, Model, Optional, Sequelize } from "sequelize";

export interface GroupAttirbutes {
    id: number;
    name: string;
    description: string;
}

export interface GroupCreateAttributes
    extends Optional<GroupAttirbutes, "id" | "description"> {}

export class Group
    extends Model<GroupAttirbutes, GroupCreateAttributes>
    implements GroupAttirbutes {
    id!: number;
    name!: string;
    description!: string | null;
}

export function groupModelInit(sequelize: Sequelize) {
    Group.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                unique: true,
                allowNull: false,
                primaryKey: true,
            },
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING, allowNull: true },
        },
        { sequelize: sequelize, tableName: "groups", timestamps: false }
    );
}
