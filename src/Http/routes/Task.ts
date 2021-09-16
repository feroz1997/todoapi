import { Router } from 'express';

import TaskController from '../controllers/Task';
import auth from '../middlewares/auth';

const taskRouter = Router();

taskRouter.post('/create', auth, TaskController.create);
taskRouter.post('/update/', auth, TaskController.updateById);
taskRouter.delete('/remove/', auth, TaskController.remove);
taskRouter.get('/:taskId', TaskController.fetchById);
taskRouter.get('/',TaskController.fetchAll);

export default taskRouter;