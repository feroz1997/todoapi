import { Request, Response } from 'express';
import UserService from '../../Application/services/User';
import HttpResponse from '../../Application/utils/HttpResponse';

export default class UserController {
  static async create(req: Request, res: Response): Promise<Response> {
    return HttpResponse.response(res, await UserService.create(req.body));
  }

  static async auth(req: Request, res: Response): Promise<Response> {
    return HttpResponse.response(res, await UserService.auth(req.body.user));
  }
  static async getUser(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    return HttpResponse.response(res,await UserService.fetchById(id))
  }
  static async googleAuth(req: Request, res: Response): Promise<Response> {
    return HttpResponse.response(res,await UserService.authWithGoogle())
  }
  static async googleUserDetails(req: Request, res: Response): Promise<Response> {
    const {code} = req.body;
    return HttpResponse.response(res,await UserService.authWithGoogleDetails(code))
  }
  // googleUserDetails
}
