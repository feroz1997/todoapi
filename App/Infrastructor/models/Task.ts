import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

export interface DoableTask {
  id: string;
  description?: string | undefined;
  UserId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface TaskInput extends Optional<DoableTask, 'description'> {}
export interface TaskOuput extends Optional<DoableTask, 'deletedAt'> {}
// <TaskInput, TaskOuput>
export class Task extends Model<TaskInput, TaskOuput> implements Task {
  public id!: string;
  public description!: string;
  public UserId!: string;


  // timestamps!
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;

 
}

Task.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },

  {
    timestamps: true,
    sequelize: sequelizeConnection,
    tableName:"tasks"
  }
);

