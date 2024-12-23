"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const blogRouter = (0, express_1.Router)();
blogRouter.get('/', blog_controller_1.blogController.getBlogs);
blogRouter.patch('/:id', (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(blog_validation_1.blogValidation.blogValidationSchema), blog_controller_1.blogController.updateBlog);
blogRouter.delete('/:id', (0, auth_1.default)('user', 'admin'), blog_controller_1.blogController.deleteBlog);
blogRouter.post('/', (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(blog_validation_1.blogValidation.blogValidationSchema), blog_controller_1.blogController.createBlog);
exports.default = blogRouter;
