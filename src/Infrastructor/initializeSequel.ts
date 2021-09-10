import {Dialect,Sequelize} from "sequelize"
import * as dotenv from "dotenv"


dotenv.config();

const sequelizeConnection = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect:process.env.DB_DIALET
});

export default  sequelizeConnection
