"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const responseUtils_1 = require("../utils/responseUtils");
// Error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`, err);
    (0, responseUtils_1.sendError)(res, err.message || "Internal Server Error", err.statusCode || 500);
};
exports.errorHandler = errorHandler;
