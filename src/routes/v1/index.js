const router = require("express").Router();

const config = require("../../config/config");
const homeRoute = require("./home.route");
const devRoute = require("./dev.route");
const crawlImageRoute = require("./crawlImage.route");
const defaultRoutes = [
    {
        path: "/",
        route: homeRoute,
    },
    {
        path: "/images",
        route: crawlImageRoute,
    },
];
const devRoutes = [
    {
        path: "/dev",
        route: devRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

if (config.env === "development") {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

module.exports = router;
