import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import path from "path";
import http from "http";
import { sequelize } from "./config/config";
import router from "./routes";
import chat from "./socket/chat";

const socketio = require("socket.io");

dotenv.config({ path: path.join(__dirname + "../../.env") });

const app: Application = express();

const server: http.Server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

sequelize.sync();

app.use("/", router);

app.get("/test", (req, res, next) => {
  res.send("111111111111111");
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

app.set("jwt-secret", process.env.JWT_SECRET);
app.set("refresh-secret", process.env.REFRESH_SECRET);

io.sockets.on("connection", (socket) => {
  chat(io, socket);
});

server.listen(3000, () => {
  console.log("server on");
});

export default app;
