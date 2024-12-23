"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required',
        })
            .min(2, 'Title must be at least 5 characters'),
        content: zod_1.z
            .string({
            required_error: 'Content is required',
        })
            .min(5, 'Content must be at least 5 characters'),
    }),
});
exports.blogValidation = {
    blogValidationSchema,
};
