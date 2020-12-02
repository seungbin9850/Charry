import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import path from "path";
import http from "http";
import socketio from "socket.io";
import { sequelize } from "./config/config";
import router from "./routes";
import chat from "./socket/chat";

dotenv.config({ path: path.join(__dirname + "../../.env") });

const app: Application = express();

const server: http.Server = http.createServer(app);
const io = socketio(server);

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

io.sockets.on("connection", (socket) => {
  chat(io, socket);
});

server.listen(8000, () => {
  console.log("server on");
});

export default app;
