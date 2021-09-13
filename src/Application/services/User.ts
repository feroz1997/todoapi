import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { UserStore } from "../../Infrastructor/physicalStore/UserStore/UserStore";
import IUserStore from "../../Infrastructor/physicalStore/UserStore/IUserStore";

import UserEntity from "../Entities/UserEntity";

import { comparePasswords, authToken } from "../../Infrastructor/utils/userUtils";
import { urlGoogle, getGoogleAccountFromCode } from "../utils/google-util";

import HttpStatusCode from "../../Application/utils/HttpStatusCode";
import HttpResponse from "../../Application/utils/HttpResponse";

class UserService {
    public constructor(public store: IUserStore) {}

    async create(data: UserEntity): Promise<HttpResponse> {
        const user = await this.store.FetchUserByEmail(data.email);
        if (user) {
            return new HttpResponse(HttpStatusCode.ALREADY_REPORTED, {
                message: "A User With This Email Already Existed!",
            });
        }
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
        return new HttpResponse(HttpStatusCode.CREATED, await this.store.createUser(UserEntity.createFromDetails(data)));
    }

    async auth(user: UserEntity): Promise<HttpResponse> {
        user.setLoggedToken(authToken({ userId: user.userId }, process.env.JWT_SECRET));
        user = await this.store.updateUser(user.userId, UserEntity.createFromObj(user));
        return new HttpResponse(HttpStatusCode.OK, { token: user.loggedToken });
    }

    async fetchById(userId: string): Promise<HttpResponse> {
        return new HttpResponse(HttpStatusCode.OK, await this.store.FetchUserById(userId));
    }

    async fetchByEmail(email: string): Promise<HttpResponse> {
        return new HttpResponse(HttpStatusCode.OK, await this.store.FetchUserByEmail(email));
    }

    async authWithGoogle(): Promise<any> {
        return new HttpResponse(HttpStatusCode.OK, await urlGoogle());
    }

    async authWithGoogleDetails(code: any): Promise<any> {
        return new HttpResponse(HttpStatusCode.OK, await getGoogleAccountFromCode(code));
    }
}
export default new UserService(new UserStore());
