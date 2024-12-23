"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGenericError = void 0;
const http_status_codes_1 = require("http-status-codes");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleGenericError = (err, res) => {
    res.status(500).json({
        success: false,
        message: err.message,
        statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        error: err,
        stack: err.stack
    });
};
exports.handleGenericError = handleGenericError;
