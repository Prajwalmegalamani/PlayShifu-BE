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
exports.getProductByIdController = exports.getProductsController = void 0;
const redisUtils_1 = require("../utils/redisUtils");
const responseUtils_1 = require("../utils/responseUtils");
const productService_1 = require("../services/productService");
// Get products controller
const getProductsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get query parameters
    const { page = 1, limit = 10 } = req.query;
    const cacheKey = `products:page:${page}:limit:${limit}`;
    // Check if page and limit are valid numbers
    if (isNaN(Number(page)) ||
        isNaN(Number(limit)) ||
        Number(page) <= 0 ||
        Number(limit) <= 0) {
        (0, responseUtils_1.sendError)(res, "Invalid page or limit", 400);
        return;
    }
    try {
        // Check Redis cache
        const cachedProducts = yield (0, redisUtils_1.getCachedProductList)(cacheKey);
        if (cachedProducts) {
            (0, responseUtils_1.sendData)(res, cachedProducts);
            return;
        }
        // Fetch from MongoDB
        const products = yield (0, productService_1.getProducts)(Number(page), Number(limit));
        // Cache the product list
        yield (0, redisUtils_1.cacheProductList)(cacheKey, products);
        (0, responseUtils_1.sendData)(res, products);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductsController = getProductsController;
// Get product by ID controller
const getProductByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Check Redis cache
        const cachedProduct = yield (0, redisUtils_1.getCachedProduct)(id);
        if (cachedProduct) {
            (0, responseUtils_1.sendData)(res, cachedProduct);
            return;
        }
        // Fetch from MongoDB
        const product = yield (0, productService_1.getProductById)(id);
        if (!product) {
            (0, responseUtils_1.sendError)(res, "Product not found", 404);
            return;
        }
        // Cache the product
        yield (0, redisUtils_1.cacheProduct)(id, product);
        (0, responseUtils_1.sendData)(res, product);
    }
    catch (error) {
        next(error);
    }
});
exports.getProductByIdController = getProductByIdController;
