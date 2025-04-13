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
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const redis_1 = __importDefault(require("../config/redis"));
const router = express_1.default.Router();
// Fetch products with pagination
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const products = yield Product_1.default.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
}));
// Fetch product by ID with Redis caching
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Check Redis cache
        const cachedProduct = yield redis_1.default.get(`product:${id}`);
        if (cachedProduct) {
            res.json(JSON.parse(cachedProduct));
            return;
        }
        // Fetch from MongoDB
        const product = yield Product_1.default.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        // Cache the product in Redis
        yield redis_1.default.set(`product:${id}`, JSON.stringify(product), {
            EX: 3600, // Cache for 1 hour
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
}));
exports.default = router;
