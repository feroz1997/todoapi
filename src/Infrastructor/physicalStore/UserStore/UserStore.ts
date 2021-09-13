import { DataTypes, Model, Association } from "sequelize";

import { Task } from "../TaskStore/TaskStore";
import UserEntity from "../../../Application/Entities/UserEntity";
import IUserStore from "./IUserStore";
import sequelizeConnection from "../../initializeSequel";

// <TaskInput, TaskOuput>
export class User extends Model {
    public userId!: string;
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
        userId: {
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
    sourceKey: "userId",
    foreignKey: "UserId",
    as: "tasks",
});
// Task.belongsTo(User, {targetKey: "id"})

export class UserStore implements IUserStore {
    async createUser(payload: UserEntity): Promise<UserEntity> {
        return UserEntity.createFromObj(await User.create(payload));
    }

    async updateUser(_id: string, data: Partial<UserEntity>): Promise<UserEntity> {
        const user = await User.findByPk(_id);
        if (!user) {
            throw new Error("Not Found");
        }
        return UserEntity.createFromObj(await user.update(data));
    }

    async removeUser(id: string): Promise<boolean> {
        return !!(await User.destroy({
            where: { id },
        }));
    }

    async FetchUserById(id: string): Promise<UserEntity | null> {
        const user = await User.findByPk(id);
        if (user) {
            return UserEntity.createFromObj(user);
        }
        return user;
    }

    async FetchUserByEmail(email: string): Promise<UserEntity | null> {
        const user = await User.findOne({
            where: {
                email,
            },
        });
        if (user) {
            return UserEntity.createFromObj(user);
        }
        return user;
    }
}
