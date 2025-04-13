"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendData = void 0;
// Send data response
const sendData = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        data,
    });
};
exports.sendData = sendData;
// Send error response
const sendError = (res, message, statusCode = 500) => {
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.sendError = sendError;
