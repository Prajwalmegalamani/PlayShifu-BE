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
exports.seedProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
/**
 * Seed products
 * @returns Promise<any>
 */
const seedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = [
        {
            name: "Product 1",
            description: "Description 1",
            price: 100,
            category: "Category A",
        },
        {
            name: "Product 2",
            description: "Description 2",
            price: 200,
            category: "Category B",
        },
        {
            name: "Product 3",
            description: "Description 3",
            price: 300,
            category: "Category C",
        },
    ];
    yield Product_1.default.insertMany(products);
    return products;
});
exports.seedProducts = seedProducts;
