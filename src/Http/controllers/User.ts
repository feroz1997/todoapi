import { Request, Response } from 'express';
import UserService from '../../Application/services/User';
import HttpResponse from '../../Application/utils/HttpResponse';

export default class UserController {
  static async create(req: Request, res: Response): Promise<Response> {
    return HttpResponse.response(res, await UserService.create(req.body));
  }

  static async auth(req: Request, res: Response): Promise<Response> {
    return HttpResponse.response(res, await UserService.auth(req.body));
  }
  static async getUser(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    return HttpResponse.response(res,await UserService.fetchById(id))
  }
}
