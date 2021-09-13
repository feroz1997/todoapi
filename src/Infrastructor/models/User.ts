import { DataTypes, Model, Optional, Association } from "sequelize";
import sequelizeConnection from "../initializeSequel";
import { Task } from "./Task";

// <TaskInput, TaskOuput>
export class User extends Model {
    public id!: string;
    public email!: string;
    public password!: string;
    public loggedToken!: string;

    // timestamps!
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;

    public readonly tasks?: Task[];
    public static associations: {
        tasks: Association<User, Task>;
    };
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loggedToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        sequelize: sequelizeConnection,
        tableName: "users",
    }
);

User.hasMany(Task, {
    sourceKey: "id",
    foreignKey: "UserId",
    as: "tasks",
});
// Task.belongsTo(User, {targetKey: "id"})
