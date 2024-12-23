"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err, res) => {
    const issues = Object.values(err.errors).map((item) => {
        return {
            name: item.name,
            path: item.path,
            message: item.message
        };
    });
    res.status(400).json({
        success: false,
        message: err.message,
        statusCode: 400,
        error: err,
        stack: err.stack,
        issues: issues
    });
};
exports.handleValidationError = handleValidationError;
