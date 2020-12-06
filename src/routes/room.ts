import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware } from "../middlewares/auth";
import * as controller from "../controllers/room";
import * as ChatController from "../controllers/chat";

const router = Router();

router.post(
  "/room",
  authMiddleware,
  tryCatchMiddleware.Error(controller.createRoom)
);

router.get(
  "/room/search",
  authMiddleware,
  tryCatchMiddleware.Error(controller.searchRoom)
);

router.post(
  "/room/join",
  authMiddleware,
  tryCatchMiddleware.Error(controller.joinRoom)
);

router.get(
  "/room",
  authMiddleware,
  tryCatchMiddleware.Error(controller.getRoom)
);

router.delete(
  "/room/:id",
  authMiddleware,
  tryCatchMiddleware.Error(controller.destroyRoom)
);

router.delete(
  "/member",
  authMiddleware,
  tryCatchMiddleware.Error(controller.leaveRoom)
);

router.get(
  "/room/title/:id",
  authMiddleware,
  tryCatchMiddleware.Error(controller.getRoomTitle)
);

router.get(
  "/",
  authMiddleware,
  tryCatchMiddleware.Error(ChatController.showChatLog)
);

export default router;
