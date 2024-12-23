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
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../errors/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const auth = (...requiredRoles) => {
    // console.log(requiredRoles, 'requiredRoles');
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const getTokenWithBearer = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!getTokenWithBearer) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, `You are not authorized to access this route `);
        }
        const token = getTokenWithBearer.split(' ')[1] || getTokenWithBearer;
        // check validation for token and decode the token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        //    user check from database
        const { email, role } = decoded;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        // check if the user is blocked
        if (user.isBlocked) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'This user is blocked');
        }
        if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not allowed to access this route');
        }
        req.user = decoded;
        // console.log(req.user,user,decoded, 'req.user');
        next();
    }));
};
exports.default = auth;
