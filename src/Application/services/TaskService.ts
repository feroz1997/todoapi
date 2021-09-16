import { TaskStore } from "../../Infrastructor/stores/TaskStore/TaskStore";
import Pagination from "../../Infrastructor/utils/Pagination";
import TaskEntity from "../entities/TaskEntity";

import HttpResponse from "../utils/HttpResponse";
import HttpStatusCode from "../utils/HttpStatusCode";

class TaskService {
    private store: TaskStore;

    constructor(store: TaskStore) {
        this.store = store;
    }

    async create(data: TaskEntity): Promise<HttpResponse> {
        try {
            let task = TaskEntity.createFromDetails(data);
            task = await this.store.addTask(task);
            return new HttpResponse(HttpStatusCode.OK, task);
        } catch (err: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(err.name), error: JSON.stringify(err.message) });
        }
    }

    async remove(taskId: string): Promise<HttpResponse> {
        try {
            const deleted = await this.store.removeTask(taskId);
            return new HttpResponse(HttpStatusCode.OK, {
                deleted,
            });
        } catch (err: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(err.name), error: JSON.stringify(err.message) });
        }
    }

    async update(data: TaskEntity): Promise<HttpResponse> {
        try {
            let task = TaskEntity.createFromObject(data);
            let updatedTask = await this.store.updateTask(task);
            return new HttpResponse(HttpStatusCode.OK, updatedTask);
        } catch (err: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(err.name), error: JSON.stringify(err.message) });
        }
    }

    async fetchById(taskId: string): Promise<HttpResponse> {
        try {
            let task = await this.store.fetchTaskById(taskId);
            return new HttpResponse(HttpStatusCode.OK, task);
        } catch (err: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(err.name), error: JSON.stringify(err.message) });
        }
    }

    async fetchAll(page: number, size: number): Promise<HttpResponse> {
        try {
            let result: any;
            if (page || size) {
                const pagination = new Pagination();
                const { limit, offset } = pagination.getPagination(page,size);
                result = await this.store.fetchPaginatedTasks(limit, offset);
                pagination.setTotal(result.count);
                pagination.setItems(result.rows);
                return new HttpResponse(HttpStatusCode.OK, pagination.getPaginationData());
            } else {
                result = await this.store.fetchAllTasks(null);
                return new HttpResponse(HttpStatusCode.OK, result);
            }
        } catch (err: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(err.name), error: JSON.stringify(err.message) });
        }
    }
}

export default new TaskService(new TaskStore());
