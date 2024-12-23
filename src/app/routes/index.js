"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("../modules/Auth/auth.router"));
const blog_router_1 = __importDefault(require("../modules/Blog/blog.router"));
const admin_router_1 = __importDefault(require("../modules/Admin/admin.router"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_router_1.default
    },
    {
        path: "/blogs",
        route: blog_router_1.default
    },
    {
        path: "/admin",
        route: admin_router_1.default
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
