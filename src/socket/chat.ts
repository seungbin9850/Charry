import * as ChatService from "../services/chat";
import * as RoomService from "../services/room";
import { JoinRequestDTO } from "../interfaces/IChat";

const socketEvent = (io, socket) => {
  socket.on("join", async (req: JoinRequestDTO) => {
    await RoomService.joinMember(req.roomId, req.email);
    socket.join(req.roomId);
    io.to(req.roomId).emit("joinMessage", req.nickname);
  });
  socket.on("chat", async (roomId: string, email: string, content: string) => {
    await ChatService.chat(roomId, email, content);
    socket.broadcast.to(roomId).emit("receive", content);
  });
  socket.on(
    "leave",
    async (roomId: string, email: string, nickname: string) => {
      await RoomService.outUser(email, roomId);
      socket.leave(roomId);
      io.to(roomId).emit("leaveMessage", nickname);
    }
  );
  socket.on("destroy", async (roomId: string, email: string) => {
    await RoomService.destroyOne(email, roomId);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
};

export default socketEvent;
