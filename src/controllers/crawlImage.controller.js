const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const cheerio = require("cheerio");
const axios = require("axios");

const get = catchAsync(async (req, res) => {
    const url = req.body.url;
    const website = req.body.website;
    const excepts = JSON.parse(req.body.excepts);
    console.log(`file: crawlImage.controller.js:10 > excepts:`, excepts);

    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const info = {
        h1: [],
        h2: [],
        h3: [],
    };

    $("h1").each((index, item) => {
        info.h1.push(item.children[0].data);
    });

    $("h2").each((index, item) => {
        info.h2.push($(item).contents().text());
    });
    $("h3").each((index, item) => {
        info.h3.push($(item).contents().text());
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

    // const url_filter_except = url_filter.reduce((acc, curr) => {
    //     excepts.forEach((element) => {
    //         if (curr.includes(element)) {
    //             return acc;
    //         } else {
    //             return [...acc, curr];
    //         }
    //     });
    // });

    let url_filter_except = url_filter;

    excepts.forEach((element) => {
        url_filter_except = url_filter_except.reduce((acc, curr) => {
            if (curr.includes(element)) {
                return acc;
            } else {
                return [...acc, curr];
            }
        }, []);
    });

    res.status(httpStatus.OK).json({ img: url_filter_except, info });
});

module.exports = { get };
