import app from "./src/app.js";
import config from "./src/config/config.js";
import logger from "./src/config/logger.js";

let server;

server = app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
});
