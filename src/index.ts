import express, { Application, Request, Response } from 'express';
import routes from "./Http/routes";
import dbInit from "./Infrastructor/init";


dbInit();
const app: Application = express();
app.use(express.json());
app.use('/api/v1',routes);

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
