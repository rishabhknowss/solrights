"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    var _a;
    const token = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //@ts-ignore
        if (decoded.id) {
            //@ts-ignore
            req.user = decoded.id;
            next();
        }
        else {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
    catch (e) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
