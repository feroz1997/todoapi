import { User, UserInput, UserOutput } from "../../models/User";
import UserEntity from "../../../Application/Domain/User";
import IUserStore from "./IUserStore";

class UserStore implements IUserStore {
    async createUser(payload: UserInput): Promise<UserEntity> {
        return UserEntity.create(await User.create(payload));
    }
    async updateUser(
        _id: string,
        data: Partial<UserInput>
    ): Promise<UserEntity> {
        const user = await User.findByPk(_id);
        if (!user) {
            throw new Error("Not Found");
        }
        return UserEntity.create(await user.update(data));
    }
    async removeUser(id: string): Promise<boolean> {
        return !!(await User.destroy({
            where: { id },
        }));
    }
    async FetchUserById(id: string): Promise<UserEntity | null> {
        return UserEntity.create(await User.findByPk(id));
    }
    async FetchUserByEmail(email: string): Promise<UserEntity[]> {
        const users = await User.findAll({
            where: {
                email,
            },
        });
        return users.map((user) => UserEntity.create(user));
    }
}

export default UserStore;
