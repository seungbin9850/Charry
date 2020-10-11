import { Request, Response, NextFunction } from "express";
import * as ChatService from "../services/chat";

export const showChatLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const roomId: string = req.params.id;
  const userId: string = req["decoded"].id;
  const page: number = Number(req.params.page);
  const chats: Array<object> = await ChatService.showLog(roomId, userId, page);
  res.status(200).json({ chats });
};
