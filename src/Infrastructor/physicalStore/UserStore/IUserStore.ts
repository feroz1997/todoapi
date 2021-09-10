import TaskEntity from "../../../Application/Domain/User";

export default interface IUserStore {
    createUser(payload: TaskEntity): Promise<TaskEntity>
    updateUser(_id: string, data: Partial<TaskEntity>): Promise<TaskEntity>
    removeUser(id: string): Promise<boolean>
    FetchUserById(id: string): Promise<TaskEntity | null>
    FetchUserByEmail(email: string): Promise<TaskEntity[]>
}
