const app = require("./src/app");
const config = require("./src/config/config");
const logger = require("./src/config/logger");

let server;

server = app.listen(config.port, () => {
    logger.info(`Server listening to port ${config.port}`);
});
