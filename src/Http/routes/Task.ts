import { Router } from 'express';
import TaskController from '../controllers/Task';
import auth from '../middlewares/auth';

const taskRouter = Router();

taskRouter.post('/create', auth, TaskController.create);
taskRouter.post('/update/:id', auth, TaskController.updateById);
taskRouter.delete('/remove/:id', auth, TaskController.remove);
taskRouter.get('/:id', TaskController.fetchById);
taskRouter.get('/',TaskController.fetchAll);

export default taskRouter;
