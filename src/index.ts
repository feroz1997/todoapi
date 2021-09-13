import express, { Application } from 'express';
import cors from "cors"

import routes from "./Http/routes";
import dbInit from "./Infrastructor/init";


dbInit();
const app: Application = express();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))
app.use(express.json());
app.use('/api/v1',routes);

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
