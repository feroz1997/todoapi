import { Request, Response } from "express";

import UserService from "../../Application/services/UserService";
import AuthService from "../../Application/services/AuthService";
import HttpResponse from "../../Application/utils/HttpResponse";

export default class UserController {

    static async getUser(req: Request, res: Response): Promise<Response> {
        const { userId } = req.params;
        return HttpResponse.response(res, await UserService.fetchByUserId(userId));
    }
    
}
