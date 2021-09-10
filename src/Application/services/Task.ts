import { v4 as uuidv4 } from "uuid";

import TaskStore from "../../Infrastructor/physicalStore/TaskStore/TaskStore";
import TaskEntity from "../Domain/Task";
import { ITaskStore } from "../../Infrastructor/physicalStore/TaskStore/ITaskStore";
import { TaskInput } from "../../Infrastructor/models/Task";

import HttpResponse from "../../Application/utils/HttpResponse";
import HttpStatusCode from "../../Application/utils/HttpStatusCode";

class TaskService {
  public constructor(public store: ITaskStore) {}
  async create(data: TaskInput): Promise<HttpResponse> {
    data.id = uuidv4();
    return new HttpResponse(
      HttpStatusCode.OK,
      await this.store.createTask(TaskEntity.create(data))
    );
  }
  async remove(_id: string, UserId: string): Promise<HttpResponse> {
    try {
      await this.store.FetchTaskByCriteria({
        id: _id,
        UserId,
      });
      return new HttpResponse(HttpStatusCode.OK, {
        delete: await this.store.removeTask(_id),
      });
    } catch (err) {
      return new HttpResponse(HttpStatusCode.BAD_REQUEST, { err });
    }
  }
  async update(_id: string, data: Partial<TaskInput>): Promise<HttpResponse> {
    try {
      await this.store.FetchTaskByCriteria({
        id: _id,
        UserId: data.UserId,
      });
      return new HttpResponse(HttpStatusCode.OK, await this.store.updateTask(_id, TaskEntity.create(data)));
    } catch (err) {
      return new HttpResponse(HttpStatusCode.BAD_REQUEST, { error: err });
    }
  }
  async fetchById(_id: string): Promise<HttpResponse> {
    return new HttpResponse(HttpStatusCode.OK, {
      task: await this.store.FetchTaskById(_id),
    });
  }
  async fetchAll(): Promise<HttpResponse> {
    return new HttpResponse(
      HttpStatusCode.OK,
      await this.store.FetchAllTasks(null)
    );
  }
}

export default new TaskService(new TaskStore());
