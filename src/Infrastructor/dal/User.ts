import { User, UserInput, UserOutput } from '../models/User';

const create = async (payload: UserInput): Promise<UserOutput> => {
 
  return await User.create(payload);
};

const update = async (_id: string, data: Partial<UserInput>): Promise<UserOutput> => {
  const user = await User.findByPk(_id);
  if(!user){
    throw new Error("Not Found")
  }
  return await user.update(data);
};
const remove = async (id: string): Promise<boolean> => {
    return !!await User.destroy({
      where: {id}
    });
};
const findById = async (id: string): Promise<UserOutput | null> => {
  const user = await User.findByPk(id);
  return await User.findByPk(id);
};

const findByEmail = async (email: string): Promise<UserOutput[]> => {
  return await User.findAll({
    where:{
      email
    }
  });
};
export default {
  create,
  update,
  remove,
  findById,
  findByEmail
}