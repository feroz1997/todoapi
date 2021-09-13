import { v4 as uuidv4 } from "uuid";

export default class TaskEntity {
    public taskId: string;
    public description: string;
    public UserId: string;

    constructor(taskId: string, description: string, UserId: string) {
        this.taskId = taskId;
        this.description = description;
        this.UserId = UserId;
    }

    static createFromObject(taskData: {taskId: string; description: string; UserId: string}) {
        const { taskId, description, UserId } = taskData;
        return new TaskEntity(taskId, description, UserId);
    }

    static createFromDetails(taskData: {description: string; UserId: string}) {
        const { description, UserId } = taskData;
        return new TaskEntity(uuidv4(), description, UserId);
    }

    setDescription(description:string){
        this.description = description
    }
}
