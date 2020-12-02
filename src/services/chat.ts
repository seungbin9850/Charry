import { Chat } from "../models/chat";
import { User } from "../models/user";
import { mkId } from "../utils/uuid";
import { ChatRequestDTO } from "../interfaces/IChat";

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

export const chat = async (req: ChatRequestDTO) => {
  const id: string = await mkId();
  await Chat.create({
    id,
    roomId: req.roomId,
    userId: req.id,
    content: req.content,
  });
};
