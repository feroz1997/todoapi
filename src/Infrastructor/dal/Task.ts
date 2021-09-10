import { Op } from 'sequelize';
import { Task, TaskInput, TaskOuput } from '../models/Task';

const create = async (payload: TaskInput): Promise<TaskOuput> => {
  return await Task.create(payload);
};
const remove = async (id: string): Promise<boolean> => {
  return !!(await Task.destroy({
    where: { id },
  }));
};
const update = async (
  _id: string,
  data: Partial<TaskInput>
): Promise<TaskOuput> => {
  const task = await Task.findByPk(_id);
  if (!task) {
    throw new Error('Not Found');
  }
  return await task.update(data);
};

const findAll = async (
  criteria: object | undefined | null
): Promise<TaskOuput[]> => {
  if (!criteria) return await Task.findAll();
  return await Task.findAll({ where: criteria });
};
const findOne = async (criteria: object): Promise<TaskOuput | null> => {
  const task = await Task.findOne({
    where: criteria,
  });
  if (!task) {
    throw new Error('Not Found');
  }
  return task;
};
const findById = async (payload: string): Promise<TaskOuput | null> => {
  return await Task.findByPk(payload);
};
export default {
  create,
  findAll,
  remove,
  findById,
  update,
  findOne,
};
