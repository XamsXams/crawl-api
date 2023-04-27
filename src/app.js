const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { errorHandler, errorHandlerCall } = require("./middlewares/error");
const routes = require("./routes/v1");

const app = express();

if (config.env !== "test") {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.use("/v1", routes);
app.use(errorHandlerCall);
app.use(errorHandler);

app.get("/", (req, res) => res.send("Hello Xams"));

module.exports = app;
