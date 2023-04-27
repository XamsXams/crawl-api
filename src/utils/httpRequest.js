import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

const get = async (path, options = {}) => {
    const res = await httpRequest.get(path, options);
    return res.data;
};

const post = async (path, data) => {
    const res = await httpRequest.post(path, data);
    return res.data;
};

export { httpRequest, get, post };
