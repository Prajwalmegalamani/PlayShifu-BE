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
exports.getCachedProductList = exports.cacheProductList = exports.getCachedProduct = exports.cacheProduct = void 0;
const redis_1 = __importDefault(require("../config/redis"));
// Cache product
const cacheProduct = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_1.default.set(`product:${productId}`, JSON.stringify(product), {
        EX: 3600,
    }); // Cache for 1 hour
});
exports.cacheProduct = cacheProduct;
// Get cached product
const getCachedProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedProduct = yield redis_1.default.get(`product:${productId}`);
    return cachedProduct ? JSON.parse(cachedProduct) : null;
});
exports.getCachedProduct = getCachedProduct;
// Cache product list
const cacheProductList = (key, products) => __awaiter(void 0, void 0, void 0, function* () {
    yield redis_1.default.set(key, JSON.stringify(products), { EX: 3600 }); // Cache for 1 hour
});
exports.cacheProductList = cacheProductList;
// Get cached product list
const getCachedProductList = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedList = yield redis_1.default.get(key);
    return cachedList ? JSON.parse(cachedList) : null;
});
exports.getCachedProductList = getCachedProductList;
