"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerZodError = void 0;
const handlerZodError = (err, res) => {
    const issues = err.issues.map((item) => {
        return {
            path: item.path.join('>'),
            message: item.message,
        };
    });
    res.status(400).json({
        success: false,
        message: 'Validation Error',
        statusCode: 400,
        error: issues,
        stack: err.stack,
    });
};
exports.handlerZodError = handlerZodError;
