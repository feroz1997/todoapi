import bcrypt from "bcrypt";

import { UserStore } from "../../Infrastructor/stores/UserStore/UserStore";

import UserEntity from "../entities/UserEntity";

import { authToken } from "../../Infrastructor/utils/UserUtils";
import { urlGoogle, getGoogleAccountFromCode } from "../utils/google-util";

import HttpStatusCode from "../../Application/utils/HttpStatusCode";
import HttpResponse from "../../Application/utils/HttpResponse";
import AuthException from "../exceptions/auth";

class AuthService {
    private store: UserStore;

    constructor(store: UserStore) {
        this.store = store;
    }

    async signUp(data: UserEntity): Promise<HttpResponse> {
        try {
            if(!(data.password && data.email)){
                throw new AuthException("Email or Password Not provided!");
            }
            let user = UserEntity.createFromDetails(data);
            let result = await this.store.fetchUserByEmail(user.email);
            if (result) {
                throw new AuthException("A User With This Email Already Existed!")
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            user.setPassword(hashedPassword);
            user = await this.store.addUser(user);
            return new HttpResponse(HttpStatusCode.CREATED, user);
        } catch (error: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(error.name), error: JSON.stringify(error.message) });
        }
    }

    async login(data: UserEntity): Promise<HttpResponse> {
        try {
            const user = UserEntity.createFromObj(data);
            const token = authToken({ userId: user.userId }, process.env.JWT_SECRET);
            user.setLoggedToken(token);
            await this.store.updateUser(UserEntity.createFromObj(user));
            return new HttpResponse(HttpStatusCode.OK, { token: user.loggedToken });
        } catch (error: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(error.name), error: JSON.stringify(error.message) });
        }
    }

    async loginWithGoogle(): Promise<any> {
        try {
            let googleLoginUrl = await urlGoogle();
            return new HttpResponse(HttpStatusCode.OK, googleLoginUrl);
        } catch (error: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(error.name), error: JSON.stringify(error.message) });
        }
    }

    async getGoogleAccountDetails(code: any): Promise<any> {
        try {
            if(!code){
                throw new AuthException("Google Auth Code not provided")
            }
            let googleAccountInfo = await getGoogleAccountFromCode(code);
            return new HttpResponse(HttpStatusCode.OK, googleAccountInfo);
        } catch (error: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(error.name), error: JSON.stringify(error.message) });
        }
    }
}
export default new AuthService(new UserStore());
