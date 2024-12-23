"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const handlerZodError_1 = require("../errors/handlerZodError");
const mongoose_1 = __importDefault(require("mongoose"));
const handleCastError_1 = require("../errors/handleCastError");
const handleDuplicateError_1 = require("../errors/handleDuplicateError");
const handleGenericError_1 = require("../errors/handleGenericError");
const globalErrorHandler = (err, req, res, _next) => {
    if (err.name && err.name === 'ZodError') {
        (0, handlerZodError_1.handlerZodError)(err, res);
    }
    else if (err instanceof mongoose_1.default.Error.CastError) {
        (0, handleCastError_1.handleCastError)(err, res);
    }
    else if (err instanceof mongoose_1.default.Error.ValidationError) {
        (0, handleDuplicateError_1.handleDuplicateError)(err, res);
    }
    else if (err.code && err.code === 11000) {
        (0, handleDuplicateError_1.handleDuplicateError)(err, res);
    }
    else if (err instanceof Error) {
        (0, handleGenericError_1.handleGenericError)(err, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
