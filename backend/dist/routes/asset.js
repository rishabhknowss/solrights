"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assetRouter = (0, express_1.Router)();
assetRouter.get("/signin", (req, res) => {
    const hardcodedWallet = '0x1234567890';
});
exports.default = assetRouter;
