import { Request, Response, NextFunction } from "express";
import { IUserLoginDTO, IUserRegisterDTO } from "../interfaces/IUser";
import * as UserService from "../services/user";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await UserService.createUser(req.body as IUserRegisterDTO);
  res.status(200).end();
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessSecret: string = req.app.get("jwt-secret");
  const refreshSecret: string = req.app.get("refresh-secret");
  const token: object = await UserService.login(
    req.body as IUserLoginDTO,
    accessSecret,
    refreshSecret
  );
  res.status(200).json(token);
};

export const refreshAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req["decoded"].id;
  const accessSecret: string = req.app.get("jwt-secret");
  const accessToken: string = await UserService.refresh(id, accessSecret);
  res.status(200).json({ accessToken });
};

export const mainUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req["decoded"].id;
  const user = await UserService.findOneUserById(id);
  res
    .status(200)
    .json({ id: user.id, userId: user.userId, nickname: user.nickname });
};
