import { Request, Response } from "express";


import AuthService from "../../Application/services/AuthService";
import HttpResponse from "../../Application/utils/HttpResponse";

export default class AuthController {

    static async signUp(req: Request, res: Response): Promise<Response> {
        return HttpResponse.response(res, await AuthService.signUp(req.body));
    }

    static async login(req: Request, res: Response): Promise<Response> {
        return HttpResponse.response(res, await AuthService.login(req.body.user));
    }

    static async googleLogin(req: Request, res: Response): Promise<Response> {
        return HttpResponse.response(res, await AuthService.loginWithGoogle());
    }

    static async googleAccountDetails(req: Request, res: Response): Promise<Response> {
        const { code } = req.body;
        return HttpResponse.response(res, await AuthService.getGoogleAccountDetails(code));
    }

}
