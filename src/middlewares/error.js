import config from "../config/config.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

const errorHandlerCall = (req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
};

const errorHandlerMiddleware = (error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
};

export { errorHandlerMiddleware, errorHandlerCall };
