const axios = require("axios");
const http = require("http");
const https = require("https");

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    httpAgent,
    httpsAgent,
});

const get = async (path, options = {}) => {
    const res = await httpRequest.get(path, options);
    return res.data;
};

const post = async (path, data) => {
    const res = await httpRequest.post(path, data);
    return res.data;
};

module.exports = { httpRequest, get, post };
