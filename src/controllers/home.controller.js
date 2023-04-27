import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";

const index = catchAsync(async (req, res) => {
    res.status(httpStatus.OK).json("Hello");
});

export { index };
