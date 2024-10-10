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
const dotenv_1 = require("dotenv");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const authMiddleware_1 = __importDefault(require("../authMiddleware"));
(0, dotenv_1.configDotenv)();
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hardcodedWallet = "0x1234567890ffff";
    try {
        const existingUser = yield prisma.user.findUnique({
            where: {
                wallet: hardcodedWallet,
            },
        });
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({ id: existingUser.id }, process.env.JWT_SECRET);
            return res.json({ token });
        }
        const user = yield prisma.user.create({
            data: {
                wallet: hardcodedWallet,
                name: req.body.name
            },
        });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET);
        return res.json({ token });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "error" });
    }
}));
userRouter.get("/", authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello from useer route");
}));
exports.default = userRouter;
