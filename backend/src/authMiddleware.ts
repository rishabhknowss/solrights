import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        //@ts-ignore
        if (decoded.id) {
            //@ts-ignore
            req.user = decoded.id;
            next();
        } else {
            res.status(401).json({ error: 'Invalid token' });
        }
    } catch (e) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}