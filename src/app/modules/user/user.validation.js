"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z
            .string({ required_error: 'Email must be provided and must be a string' })
            .email(),
        password: zod_1.z
            .string({
            required_error: 'Password must be provided and must be a string',
        })
            .max(20, { message: 'Password must be less than 20 characters' }),
    }),
});
exports.userValidation = {
    userValidationSchema,
};
