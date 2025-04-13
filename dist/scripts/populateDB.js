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
const mongoose_1 = __importDefault(require("mongoose"));
const Product_1 = __importDefault(require("../models/Product"));
const db_1 = __importDefault(require("../config/db"));
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
    ];
    yield Product_1.default.insertMany(products);
    console.log("Dummy products added");
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.default)();
    yield seedProducts();
    mongoose_1.default.connection.close();
});
run();
