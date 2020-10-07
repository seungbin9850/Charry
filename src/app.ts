import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";
import path from "path";
import http from "http";
import socketio from "socket.io";

dotenv.config({ path: path.join(__dirname + "../../.env") });

const app: Application = express();

const server: http.Server = http.createServer(app);
const io: any = socketio(server);

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

io.on("connection", (socket: any) => {
  console.log("socket connected");
});

server.listen(3000, () => {
  console.log("server on");
});

export default app;
