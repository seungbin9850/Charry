import * as ChatService from "../services/chat";
import * as RoomService from "../services/room";
import { ChatRequestDTO, LeaveRoomRequestDTO } from "../interfaces/IChat";

const socketEvent = (io, socket) => {
  socket.on("join", async (roomId: string) => {
    console.log(roomId);
    socket.join(roomId);
  });
  socket.on("chat", async (req: ChatRequestDTO) => {
    console.log(req);
    await ChatService.chat(req);
    socket.broadcast.to(req.roomId).emit("receive", req.content);
  });
  socket.on("leave", async (req: LeaveRoomRequestDTO) => {
    await RoomService.outUser(req.userId, req.roomId);
    socket.leave(req.roomId);
    // io.to(roomId).emit("leaveMessage", nickname);
  });
  socket.on("destroy", async (roomId: string, email: string) => {
    await RoomService.destroyOne(email, roomId);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
};

export default socketEvent;
