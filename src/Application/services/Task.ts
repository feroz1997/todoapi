import { v4 as uuidv4 } from "uuid";

import { TaskStore } from "../../Infrastructor/physicalStore/TaskStore/TaskStore";
import TaskEntity from "../Entities/TaskEntity";
import { ITaskStore } from "../../Infrastructor/physicalStore/TaskStore/ITaskStore";

import HttpResponse from "../../Application/utils/HttpResponse";
import HttpStatusCode from "../../Application/utils/HttpStatusCode";

class TaskService {

    public constructor(public store: ITaskStore) {}

    async create(data: TaskEntity): Promise<HttpResponse> {
        try {
            return new HttpResponse(HttpStatusCode.OK, await this.store.createTask(TaskEntity.createFromDetails(data)));
        } catch (err) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { error: err });
        }
    }

    async remove(_id: string, UserId: string): Promise<HttpResponse> {
        try {
            await this.store.FetchTaskByCriteria({ id: _id, UserId });
            return new HttpResponse(HttpStatusCode.OK, {
                delete: await this.store.removeTask(_id),
            });
        } catch (err) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { err });
        }
    }

    async update(_id: string, data: Partial<TaskEntity>): Promise<HttpResponse> {
        try {
            const task = await this.store.FetchTaskByCriteria({ id: _id, UserId: data.UserId });
            if (task && data.description) {
                task.setDescription(data.description);
                return new HttpResponse(HttpStatusCode.OK, await this.store.updateTask(_id, task));
            } else {
                return new HttpResponse(HttpStatusCode.BAD_REQUEST, { error: "Task Not Found" });
            }
        } catch (err) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { error: err });
        }
    }

    async fetchById(_id: string): Promise<HttpResponse> {
        try {
            return new HttpResponse(HttpStatusCode.OK, {task: await this.store.FetchTaskById(_id),});
        } catch (err) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { error: err });
        }
    }

    async fetchAll(): Promise<HttpResponse> {
        try {
            return new HttpResponse(HttpStatusCode.OK, await this.store.FetchAllTasks(null));
        } catch (err) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { error: err });
        }
    }
}

export default new TaskService(new TaskStore());
