import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../initializeSequel";

import TaskEntity from "../../../Application/Entities/TaskEntity";
import { ITaskStore } from "./ITaskStore";

export class Task extends Model {
    public taskId!: string;
    public description!: string;
    public UserId!: string;

    // timestamps!
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

Task.init(
    {
        taskId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        UserId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        timestamps: true,
        sequelize: sequelizeConnection,
        tableName: "tasks",
    }
);

export class TaskStore implements ITaskStore {
    async createTask(payload: TaskEntity): Promise<TaskEntity> {
        return TaskEntity.createFromObject(await Task.create(payload));
    }

    async removeTask(taskId: string): Promise<boolean> {
        return !!(await Task.destroy({
            where: { taskId },
        }));
    }

    async updateTask(_taskId: string, data: Partial<TaskEntity>): Promise<TaskEntity> {
        const task = await Task.findByPk(_taskId);
        if (!task) {
            throw new Error("Not Found");
        }
        return TaskEntity.createFromObject(await task.update(data));
    }

    async FetchAllTasks(criteria: object | undefined | null): Promise<TaskEntity[]> {
        let tasks: Task[];

        if (!criteria) {
            tasks = await Task.findAll();
        } else {
            tasks = await Task.findAll({ where: criteria });
        }

        return tasks.map((task) => TaskEntity.createFromObject(task));
    }

    async FetchTaskByCriteria(criteria: object): Promise<TaskEntity | null> {
        const task = await Task.findOne({
            where: criteria,
        });
        if (!task) {
            throw new Error("Not Found");
        }
        return TaskEntity.createFromObject(task);
    }

    async FetchTaskById(payload: string): Promise<TaskEntity | null> {
        let task = await Task.findByPk(payload)
        if(task){
            return TaskEntity.createFromObject(task);
        }
        return task;
    }
}
