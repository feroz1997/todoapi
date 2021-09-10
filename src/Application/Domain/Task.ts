export default class Task {
    private constructor(public id: string, public description: string, public UserId: string) {
    }
    static create(taskData: any) {
        const { id, description, UserId } = taskData;
        return new Task(id, description, UserId);
    }
}