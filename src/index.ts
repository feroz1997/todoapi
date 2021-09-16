import express, { Application } from "express";
import cors from "cors";
import { developmentLogger, productionLogger , errorLogger} from "./Infrastructor/loggers";

import routes from "./Http/routes";

import dbInit from "./Infrastructor/init";

dbInit();
const app: Application = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());

// if (process.env.ENVIRONMENT === "development") {
    app.use(developmentLogger);
// } else {
    app.use(productionLogger);
// }

app.use("/api/v1", routes);

app.use(errorLogger)

const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
