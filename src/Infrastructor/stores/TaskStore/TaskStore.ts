import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../initializeSequel";

import TaskEntity from "../../../Application/entities/TaskEntity";
import TaskException from "../../exceptions/stores/task";

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

export class TaskStore {

    async addTask(data: TaskEntity): Promise<TaskEntity> {
        const task = await Task.create(data);
        if (!task) {
            throw new TaskException("Could not Created the Task");
        }
        return TaskEntity.createFromObject(task);
    }

    async removeTask(taskId: string): Promise<boolean> {
        return !!(await Task.destroy({
            where: { taskId },
        }));
    }

    async updateTask(task: Partial<TaskEntity>): Promise<object> {
        return await Task.update(task, {
            where: {
                taskId: task.taskId,
            },
        });
    }

    async fetchAllTasks(criteria: object | undefined | null): Promise<TaskEntity[]> {
        let tasks: Task[];
        if (!criteria) {
            tasks = await Task.findAll();
        } else {
            tasks = await Task.findAll({ where: criteria });
        }
        return tasks.map((task) => TaskEntity.createFromObject(task));
    }

    async fetchTaskByCriteria(criteria: object): Promise<TaskEntity | null> {
        const task = await Task.findOne({
            where: criteria,
        });

        if (!task) {
            throw new TaskException("Not Found");
        }

        return TaskEntity.createFromObject(task);
    }

    async fetchTaskById(taskId: string): Promise<TaskEntity | null> {
        let task = await Task.findOne({
            where: {
                taskId,
            },
        });
        if (!task) {
            throw new TaskException("Not Found");
        }
        return TaskEntity.createFromObject(task);
    }

    async fetchPaginatedTasks(limit: number | undefined, offset: number | undefined): Promise<any> {
        const results = await Task.findAndCountAll({
            limit,
            offset,
        });
        return results;
    }
}
