import * as ChatService from "../services/chat";
import * as RoomService from "../services/room";
import * as UserService from "../services/user";
import { ChatRequestDTO, LeaveRoomRequestDTO } from "../interfaces/IChat";
import { User } from "../models/user";

const socketEvent = (io, socket) => {
  socket.on("join", async (roomId: string) => {
    console.log(roomId);
    socket.join(roomId);
  });
  socket.on("chat", async (req: ChatRequestDTO) => {
    console.log(req);
    await ChatService.chat(req);
    const user: User = await UserService.findOneUserById(req.userId);
    socket.broadcast.to(req.roomId).emit("receive", user.nickname, req.content);
  });
  socket.on("leave", async (req: LeaveRoomRequestDTO) => {
    await RoomService.outUser(req.userId, req.roomId);
    socket.leave(req.roomId);
    const user: User = await UserService.findOneUserById(req.userId);
    socket.broadcast.to(req.roomId).emit("leaveMessage", user.nickname);
  });
  // socket.on("destroy", async (roomId: string, email: string) => {
  //   await RoomService.destroyOne(email, roomId);
  //   socket.broadcast.to(req.roomId).emit("receive", user.nickname);
  // });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
};

export default socketEvent;
