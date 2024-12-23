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
exports.blogService = void 0;
const http_status_codes_1 = require("http-status-codes");
const blog_model_1 = __importDefault(require("./blog.model"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const createBlog = (authorPayload, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const author = authorPayload._id;
    const createBlog = yield blog_model_1.default.create(Object.assign(Object.assign({}, payload), { author }));
    const result = yield createBlog.populate('author');
    return result;
});
const updateBlog = (blogId, payload, loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // check blog id from database
    const checkBlogId = yield blog_model_1.default.findById(blogId).populate('author');
    // if blog id not fount it show a error
    if (!checkBlogId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    else if (((_a = checkBlogId === null || checkBlogId === void 0 ? void 0 : checkBlogId.author) === null || _a === void 0 ? void 0 : _a.email) !== loggedUser.email) {
        // check user
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not authorized to update this blog');
    }
    else if ((checkBlogId === null || checkBlogId === void 0 ? void 0 : checkBlogId.isPublished) === false) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'You can not updated this blog.Blog already deleted');
    }
    // update blog id from database
    const updateBlog = yield blog_model_1.default.findByIdAndUpdate(blogId, payload, {
        new: true,
    });
    // if blog not updated it show a error
    if (!updateBlog) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Blog not updated');
    }
    const result = yield updateBlog.populate('author');
    return result;
});
const deleteBlog = (blogId, loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    // check blog id from database
    var _a;
    const checkBlogId = yield blog_model_1.default.findById(blogId).populate('author');
    // if blog id not fount it show a error
    if (!checkBlogId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Blog not found');
    }
    else if (((_a = checkBlogId === null || checkBlogId === void 0 ? void 0 : checkBlogId.author) === null || _a === void 0 ? void 0 : _a.email) !== loggedUser.email) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not authorized to delete this blog');
    }
    else if ((checkBlogId === null || checkBlogId === void 0 ? void 0 : checkBlogId.isPublished) === false) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Blog already deleted');
    }
    // update blog id from database
    yield blog_model_1.default.findByIdAndUpdate(blogId, { isPublished: false }, {
        new: true,
    });
    // console.log(data, 'update data');
});
const getBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['title', 'content '];
    const blogs = new queryBuilder_1.default(blog_model_1.default.find({ isPublished: true }).populate('author'), query)
        .search(searchableFields)
        .filter()
        .sort();
    const result = yield blogs.modelQuery
        .select('_id title content author')
        .lean();
    return result;
});
exports.blogService = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
};
