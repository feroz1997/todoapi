import { Task } from "./stores/TaskStore/TaskStore";
import { User } from "./stores/UserStore/UserStore";

const isDev = true;
// const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    Task.sync({ alter: false });
    User.sync({ alter: false });
};

export default dbInit;
