"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
// Admin authentication middleware
const adminAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || token !== `Bearer ${config_1.default.adminToken}`) {
        res.status(403).json({ message: "Unauthorized access" });
        return;
    }
    next();
};
exports.default = adminAuth;
