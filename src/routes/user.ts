import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { authMiddleware, refreshMiddleware } from "../middlewares/auth";
import * as controller from "../controllers/user";

const router = Router();

router.post("/", tryCatchMiddleware.Error(controller.register));
router.post("/login", tryCatchMiddleware.Error(controller.login));
router.put(
  "/refresh",
  refreshMiddleware,
  tryCatchMiddleware.Error(controller.refreshAccess)
);
router.get(
  "/main",
  authMiddleware,
  tryCatchMiddleware.Error(controller.mainUserInfo)
);

export default router;
