import * as ChatService from "../services/chat";
import * as RoomService from "../services/room";

const socketEvent = (io, socket) => {
  socket.on("join", async (roomId: string, nickname: string) => {
    await RoomService.joinMember(roomId, socket.decoded_token.id);
    socket.join(roomId);
    io.to(roomId).emit("joinMessage", nickname);
  });
  socket.on("chat", async (roomId: string, content: string) => {
    await ChatService.chat(roomId, socket.decoded_token.id, content);
    io.to(roomId).emit("chatMessage", content);
  });
  socket.on("leave", async (roomId: string, nickname: string) => {
    await RoomService.outUser(socket.decoded_token.id, roomId);
    socket.leave(roomId);
    io.to(roomId).emit("leaveMessage", nickname);
  });
  socket.on("destroy", async (roomId: string) => {
    await RoomService.destroyOne(socket.decoded_token.id, roomId);
  });
  socket.on("disconnect");
};

export default socketEvent;
