"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const routes_1 = __importDefault(require("./app/routes"));
const http_status_codes_1 = require("http-status-codes");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application router
// all route
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'welcome to my backend project' });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use('*', (req, res) => {
    res.status(404).json({
        status: false,
        StatusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
        message: 'Route not found',
    });
});
exports.default = app;
