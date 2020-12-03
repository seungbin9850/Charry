import { Chat } from "../models/chat";
import { User } from "../models/user";
import { mkId } from "../utils/uuid";
import { ChatRequestDTO, ShowLogsRequestDTO } from "../interfaces/IChat";

export const showLog = async (
  req: ShowLogsRequestDTO
): Promise<Array<Chat>> => {
  const chats = await Chat.findAll({
    include: [{ model: User, attributes: ["nickname"] }],
    where: { roomId: req.roomId },
    offset: 16 * (req.page - 1),
    limit: 16,
  });
  chats.forEach((e) => {
    e["dataValues"].isMine = false;
    if (e.userId === req.userId) e["dataValues"].isMine = true;
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
