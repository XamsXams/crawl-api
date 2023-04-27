import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import config from "./config/config.js";
import { errorHandler, successHandler } from "./config/morgan.js";
import {
    errorHandlerMiddleware,
    errorHandlerCall,
} from "./middlewares/error.js";
import routes from "./routes/v1/index.js";

const app = express();

if (config.env !== "test") {
    app.use(successHandler);
    app.use(errorHandler);
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(
    cors({ origin: ["http://localhost:3000", "https://xamsxams.vercel.app"] })
);
app.use("/v1", routes);
app.use(errorHandlerCall);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => res.send("Hello Xams"));

export default app;
