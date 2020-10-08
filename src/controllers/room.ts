import { Request, Response, NextFunction } from "express";
import * as RoomService from "../services/room";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title: string = req.body.title;
  const hostId: string = req["decoded"].id;
  await RoomService.createOne(title, hostId);
  res.status(200).end();
};

export const searchRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const title: any = req.query.title;
  const rooms: Array<object> = await RoomService.searchOne(title);
  res.status(200).json({ rooms });
};

export const joinRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roomId: string = req.body.roomId;
  const userId: string = req["decoded"].id;
  await RoomService.joinMember(roomId, userId);
  res.status(200).end();
};

export const getRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req["decoded"].id;
  const rooms: Array<object> = await RoomService.getAll(userId);
  res.status(200).json({ rooms });
};

export const leaveRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req["decoded"].id;
  const roomId: string = req.body.roomId;
  await RoomService.outUser(userId, roomId);
  res.status(200).end();
};

export const destroyRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req["decoded"].id;
  const roomId: string = req.body.roomId;
  await RoomService.destroyOne(userId, roomId);
  res.status(200).end();
};
