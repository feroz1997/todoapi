import UserEntity from "../../../Application/Entities/UserEntity";

export default interface IUserStore {
    createUser(payload: UserEntity): Promise<UserEntity>
    updateUser(_id: string, data: Partial<UserEntity>): Promise<UserEntity>
    removeUser(id: string): Promise<boolean>
    FetchUserById(id: string): Promise<UserEntity | null>
    FetchUserByEmail(email: string): Promise<UserEntity | null >
}
