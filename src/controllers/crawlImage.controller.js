import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import cheerio from "cheerio";
import axios from "axios";
import fetch from "node-fetch";
import { httpRequest } from "../utils/httpRequest.js";

const get = catchAsync(async (req, res) => {
    const url = req.body.url;
    const website = req.body.website;
    const excepts = JSON.parse(req.body.excepts);
    // let excepts;
    // if (req.body?.excepts) {
    //     if (typeof req.body?.excepts === "string") {
    //         excepts = JSON.parse(req.body?.excepts);
    //     } else {
    //         excepts = req.body?.excepts;
    //     }
    // }

    // const { data: html } = await axios.get(url, { timeout: 10000 });
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const info = {
        h1: [],
    };

    $("h1").each((index, item) => {
        info.h1.push(item.children[0].data);
    });

    console.log({ info });

    if (website.includes("sosoye")) {
        $(".blog-sidebar").remove();
    }

    let img_elements = [];
    $("img").each((index, item) => {
        img_elements.push(item);
    });

    const url_filter = img_elements.reduce((acc, img, index) => {
        if (img?.attribs?.src) {
            const src = img.attribs.src;
            if (!src.includes(".gif")) {
                console.log(img?.attribs?.src);
                return [...acc, img?.attribs?.src];
            }
        }
        return acc;
    }, []);

    let url_filter_except = url_filter;

    if (excepts) {
        excepts.forEach((element) => {
            url_filter_except = url_filter_except.reduce((acc, curr) => {
                if (curr.includes(element)) {
                    return acc;
                } else {
                    return [...acc, curr];
                }
            }, []);
        });
    }

    res.status(httpStatus.OK).json({
        img: url_filter_except,
        info,
        html: JSON.stringify(html),
    });
});

export { get };
