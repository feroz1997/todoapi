
import  {Task}  from './models/Task';
import  {User}  from './models/User';
const isDev = true;
// const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Task.sync({ alter: false })
  User.sync({ alter: false })
}
export default dbInit 