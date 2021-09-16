import { Request, Response } from "express";

import TaskService from "../../Application/services/TaskService";
import HttpResponse from "../../Application/utils/HttpResponse";

export default class TaskController {
    static async create(req: Request, res: Response): Promise<Response> {
        return HttpResponse.response(res, await TaskService.create(req.body));
    }

    static async updateById(req: Request, res: Response): Promise<Response> {
        return HttpResponse.response(res, await TaskService.update(req.body));
    }

    static async remove(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.body;
        return HttpResponse.response(res, await TaskService.remove(taskId));
    }

    static async fetchById(req: Request, res: Response): Promise<Response> {
        const { taskId } = req.params;
        return HttpResponse.response(res, await TaskService.fetchById(taskId));
    }

    static async fetchAll(req: Request, res: Response): Promise<Response> {
        const { page, size } = req.query;
        return HttpResponse.response(res, await TaskService.fetchAll(Number(page),Number(size)));
    }
}
