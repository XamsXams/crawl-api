import express from "express";

import config from "../../config/config.js";
import homeRoute from "./home.route.js";
import devRoute from "./dev.route.js";
import crawlImageRoute from "./crawlImage.route.js";
const router = express.Router();

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

export default router;
