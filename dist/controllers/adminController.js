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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProductsController = void 0;
const adminService_1 = require("../services/adminService");
const responseUtils_1 = require("../utils/responseUtils");
// Seed products controller
const seedProductsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, adminService_1.seedProducts)();
        (0, responseUtils_1.sendData)(res, "Products seeded successfully", products);
    }
    catch (error) {
        next(error);
    }
});
exports.seedProductsController = seedProductsController;
