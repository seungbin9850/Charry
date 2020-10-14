import * as ChatService from "../services/chat";
import * as RoomService from "../services/room";

const socketEvent = (io, socket) => {
  socket.on("join", async (roomId: string, email: string, nickname: string) => {
    await RoomService.joinMember(roomId, email);
    socket.join(roomId);
    io.to(roomId).emit("joinMessage", nickname);
  });
  socket.on("chat", async (roomId: string, email: string, content: string) => {
    await ChatService.chat(roomId, email, content);
    io.to(roomId).emit("chatMessage", content);
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
  socket.on("disconnect");
};

export default socketEvent;
