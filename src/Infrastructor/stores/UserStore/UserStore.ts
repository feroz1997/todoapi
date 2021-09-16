import { DataTypes, Model, Association } from "sequelize";

import { Task } from "../TaskStore/TaskStore";
import UserEntity from "../../../Application/entities/UserEntity";
import sequelizeConnection from "../../initializeSequel";
import UserException from "../../exceptions/stores/user";

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

export class UserStore {

    async addUser(data: UserEntity): Promise<UserEntity> {
        const user = await User.create(data);
        if (!user) {
            throw new UserException("Could Not Created User");
        }
        return UserEntity.createFromObj(user);
    }

    async updateUser(user: Partial<UserEntity>): Promise<object> {
        return await User.update(user, { where: { userId: user.userId } });
    }

    async removeUser(userId: string): Promise<boolean> {
        return !!(await User.destroy({
            where: { userId },
        }));
    }

    async fetchByUserId(userId: string): Promise<UserEntity | boolean> {
        const user = await User.findOne({
            where: { userId },
        });

        if (!user) {
            throw new UserException("Not Found");
        }
        return UserEntity.createFromObj(user);
    }

    async fetchUserByEmail(email: string): Promise<UserEntity> {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user) {
            throw new UserException("Not Found");
        }
        return UserEntity.createFromObj(user);
    }
}
