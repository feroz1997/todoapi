import TaskEntity from "../../../Application/Domain/Task";

export interface ITaskStore {
  createTask(payload: TaskEntity): Promise<TaskEntity>;
  removeTask(id: string): Promise<boolean>;
  updateTask(_id: string, data: Partial<TaskEntity>): Promise<TaskEntity>;
  FetchAllTasks(criteria: object | undefined | null): Promise<TaskEntity[]>;
  FetchTaskByCriteria(criteria: object): Promise<TaskEntity | null>;
  FetchTaskById(payload: string): Promise<TaskEntity | null>;
}
