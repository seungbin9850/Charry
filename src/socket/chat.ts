import * as ChatService from "../services/chat";
import * as RoomService from "../services/room";

const socketEvent = (io, socket) => {
  socket.on("join", async (roomId, nickname) => {
    await RoomService.joinMember(roomId, socket.decoded_token.id);
    socket.join(roomId);
    io.to(roomId).emit("joinMessage", nickname);
  });
  socket.on("chat", async (roomId, content) => {
    await ChatService.chat(roomId, socket.decoded_token.id, content);
    io.to(roomId).emit("chatMessage", content);
  });
  socket.on("leave", async (roomId, nickname) => {
    await RoomService.outUser(roomId, socket.decoded_token.id);
    socket.leave(roomId);
    io.to(roomId).emit("leaveMessage", nickname);
  });
  socket.on("disconnect");
};

export default socketEvent;
