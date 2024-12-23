"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        success: true,
        message: data.message,
        statusCode: data.statusCode,
        data: data.data
    });
};
exports.default = sendResponse;
