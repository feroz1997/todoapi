import { Request, Response } from 'express';

import TaskService from '../../Application/services/Task';
import HttpResponse from '../../Application/utils/HttpResponse';


export default class TaskController {
  static async create(req: Request, res: Response): Promise<Response> {
    return HttpResponse.response(res, await TaskService.create(req.body));
  }

  static async updateById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return HttpResponse.response(res, await TaskService.update(id, req.body));
  }

  static async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    return HttpResponse.response(res, await TaskService.remove(id,req.body.UserId));
  }

  static async fetchById(req: Request, res: Response):Promise<Response>{
    const { id } = req.params;
    return HttpResponse.response(res, await TaskService.fetchById(id));
  }
  static async fetchAll(req: Request, res: Response): Promise<Response> {
    return HttpResponse.response(res, await TaskService.fetchAll());
  }
}
