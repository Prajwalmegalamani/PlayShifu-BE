"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Seed products route
router.post("/seed", auth_1.default, adminController_1.seedProductsController);
exports.default = router;
