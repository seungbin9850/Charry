import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import path from "path";
import http from "http";
import socketio from "socket.io";
import { sequelize } from "./config/config";
import router from "./routes";
import * as ChatService from "./services/chat";
import * as RoomService from "./services/room";

dotenv.config({ path: path.join(__dirname + "../../.env") });

const app: Application = express();

const server: http.Server = http.createServer(app);
const io: any = socketio(server);

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize.sync();

app.use("/", router);

app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

app.set("jwt-secret", process.env.JWT_SECRET);
app.set("refresh-secret", process.env.REFRESH_SECRET);

io.on("connection", (socket) => {
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
});

server.listen(8000, () => {
  console.log("server on");
});

export default app;
