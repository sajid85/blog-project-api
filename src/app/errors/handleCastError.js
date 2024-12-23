"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err, res) => {
    res.status(400).json({
        success: false,
        message: err.message,
        statusCode: 400,
        error: err,
        stack: err.stack,
    });
};
exports.handleCastError = handleCastError;
