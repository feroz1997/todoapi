import {Dialect,Sequelize} from "sequelize"

const sequelizeConnection = new Sequelize(process.env.DATABASE_NAME ,process.env.USERNAME,process.env.PASSWORD,{
    host: process.env.HOST,
    dialect:"mysql"
});

export default  sequelizeConnection