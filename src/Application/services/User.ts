
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";


import UserStore from "../../Infrastructor/physicalStore/UserStore/UserStore";
import IUserStore from "../../Infrastructor/physicalStore/UserStore/IUserStore";

import UserEntity from "../Domain/User";

import { UserInput } from "../../Infrastructor/models/User";
import {
  comparePasswords,
  authToken,
} from "../../Infrastructor/utils/userUtils";

import HttpStatusCode from "../../Application/utils/HttpStatusCode";
import HttpResponse from "../../Application/utils/HttpResponse";

class UserService {
  public constructor(public store: IUserStore) {}

  async create(data: UserInput): Promise<HttpResponse> {
    const results = await this.store.FetchUserByEmail(data.email);
    if (results.length != 0) {
      return new HttpResponse(HttpStatusCode.ALREADY_REPORTED, {
        message: "A User With This Email Already Existed!",
      });
    }
    data.id = uuidv4();
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    return new HttpResponse(
      HttpStatusCode.CREATED,
      await this.store.createUser(UserEntity.create(data))
    );
  }

  async auth(data: UserInput): Promise<HttpResponse> {
    if (!(data.email && data.password)) {
      return new HttpResponse(HttpStatusCode.BAD_REQUEST, {
        message: "Please Provide Email Or Password",
      });
    }
    const result = await this.store.FetchUserByEmail(data.email);
    if (result.length === 0)
      return new HttpResponse(HttpStatusCode.UNAUTHORIZED, {
        message: "Invalid Email or Password",
      });
    let user = result[0];
    const validPassword = await comparePasswords(data.password, user.password);
    if (!validPassword)
      return new HttpResponse(HttpStatusCode.UNAUTHORIZED, {
        message: "Invalid Email or Password",
      });
    user = await this.store.updateUser(user.id, UserEntity.create({
      ...user,
      loggedToken: authToken({ userId: user.id }, "SECRET"),
    }));
    return new HttpResponse(HttpStatusCode.OK, { token: user.loggedTokken });
  }

  async fetchById(_id: string): Promise<HttpResponse> {
    return new HttpResponse(
      HttpStatusCode.OK,
      await this.store.FetchUserById(_id)
    );
  }
}
export default new UserService(new UserStore());
