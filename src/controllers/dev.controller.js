import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";

const index = catchAsync(async (req, res) => {
    // const temp = await got.get(
    //     "https://donghohaitrieu.com/kinh-nghiem/thang-4-cung-gi-giai-ma-van-menh-tinh-yeu-su-nghiep.html"
    // );

    // console.log(temp);
    res.status(httpStatus.OK).json("dev");
});

export { index };
