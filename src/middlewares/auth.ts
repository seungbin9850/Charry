import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers["authorization"];
  const bearer = token.split("Bearer ")[1];
  if (!token) return res.status(403).json({ message: "로그인 되어있지 않음" });
  jwt.verify(bearer, req.app.get("jwt-secret"), (err, decoded) => {
    if (err) return res.status(403).json({ message: "토큰 만료됨" });
    req["decoded"] = decoded;
    next();
  });
};

export const refreshMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers["authorization"];
  const bearer = token.split("Bearer ")[1];
  if (!token) return res.status(403).json({ message: "로그인 되어있지 않음" });
  jwt.verify(bearer, req.app.get("refresh-secret"), (err, decoded) => {
    if (err) return res.status(403).json({ message: "토큰 만료됨" });
    req["decoded"] = decoded;
    next();
  });
};
