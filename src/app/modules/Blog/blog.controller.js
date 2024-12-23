"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const blog_service_1 = require("./blog.service");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const author = req === null || req === void 0 ? void 0 : req.user;
    if (!author) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not authorized to access this route');
    }
    const result = yield blog_service_1.blogService.createBlog(author, data);
    const { _id, author: blogAuthor, content, title } = result;
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        message: 'Blog created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: { _id, author: blogAuthor, content, title },
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const payload = req.body;
    const result = yield blog_service_1.blogService.updateBlog(blogId, payload, req === null || req === void 0 ? void 0 : req.user);
    const { _id, author: blogAuthor, content, title } = result;
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Blog updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: { _id, author: blogAuthor, content, title },
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const user = req === null || req === void 0 ? void 0 : req.user;
    yield blog_service_1.blogService.deleteBlog(blogId, user);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Blog deleted successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
}));
const getBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryData = req === null || req === void 0 ? void 0 : req.query;
    // console.log(queryData,"queryData")
    const result = yield blog_service_1.blogService.getBlogs(queryData);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: 'Blogs fetched successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
};
