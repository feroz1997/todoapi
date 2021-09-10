import { Task } from "../../models/Task";
import TaskEntity from "../../../Application/Domain/Task";
import { ITaskStore } from "./ITaskStore";

class TaskStore implements ITaskStore {
    async createTask(payload: TaskEntity): Promise<TaskEntity> {
        return TaskEntity.create(await Task.create(payload));
    }
    async removeTask(id: string): Promise<boolean> {
        return !!(await Task.destroy({
            where: { id },
        }));
    }
    async updateTask(
        _id: string,
        data: Partial<TaskEntity>
    ): Promise<TaskEntity> {
        const task = await Task.findByPk(_id);
        if (!task) {
            throw new Error("Not Found");
        }
        return TaskEntity.create(await task.update(data));
    }

    async FetchAllTasks(
        criteria: object | undefined | null
    ): Promise<TaskEntity[]> {
        if (!criteria) return await Task.findAll();
        const tasks = await Task.findAll({ where: criteria });
        return tasks.map((task) => TaskEntity.create(task));
    }
    async FetchTaskByCriteria(criteria: object): Promise<TaskEntity | null> {
        const task = await Task.findOne({
            where: criteria,
        });
        if (!task) {
            throw new Error("Not Found");
        }
        return TaskEntity.create(task);
    }
    async FetchTaskById(payload: string): Promise<TaskEntity | null> {
        return TaskEntity.create(await Task.findByPk(payload));
    }
}
export default TaskStore;
