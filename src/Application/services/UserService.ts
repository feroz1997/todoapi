import { UserStore } from "../../Infrastructor/stores/UserStore/UserStore";

import HttpStatusCode from "../utils/HttpStatusCode";
import HttpResponse from "../utils/HttpResponse";
import ValidationException from "../exceptions/validation";

class UserService {
    private store: UserStore;

    constructor(store: UserStore) {
        this.store = store;
    }

    async fetchByUserId(userId: string): Promise<HttpResponse> {
        try {
            if(!userId){
                throw new ValidationException("UserId not Provided")
            }
            let user = await this.store.fetchByUserId(userId);
            return new HttpResponse(HttpStatusCode.OK, user);
        } catch (error: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(error.name), error: JSON.stringify(error.message) });
        }
    }

    async fetchByEmail(email: string): Promise<HttpResponse> {
        try {
            if(!email){
                throw new ValidationException("UserEmail not Provided")
            }
            let user = await this.store.fetchUserByEmail(email);
            return new HttpResponse(HttpStatusCode.OK, user);
        } catch (error: any) {
            return new HttpResponse(HttpStatusCode.BAD_REQUEST, { name: JSON.stringify(error.name), error: JSON.stringify(error.message) });
        }
    }
}
export default new UserService(new UserStore());
