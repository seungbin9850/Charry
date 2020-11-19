import { Chat } from "../models/chat";
import { User } from "../models/user";
import { mkId } from "../utils/uuid";

export const showLog = async (
  roomId: string,
  userId: string,
  page: number
): Promise<Array<Chat>> => {
  const chats = await Chat.findAll({
    include: [{ model: User, attributes: ["nickname"] }],
    where: { roomId },
    offset: 16 * (page - 1),
    limit: 16,
  });
  chats.forEach((e) => {
    e["dataValues"].isMine = false;
    if (e.userId === userId) e["dataValues"].isMine = true;
  });
  return chats;
};

export const chat = async (roomId: string, userId: string, content: string) => {
  const id: string = await mkId();
  await Chat.create({ id, roomId, userId, content });
};

