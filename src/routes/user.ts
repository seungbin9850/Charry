import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import { refreshMiddleware } from "../middlewares/auth";
import * as controller from "../controllers/user";

const router = Router();

router.post("/", tryCatchMiddleware.Error(controller.register));
router.post("/login", tryCatchMiddleware.Error(controller.login));
router.put(
  "/refresh",
  refreshMiddleware,
  tryCatchMiddleware.Error(controller.refreshAccess)
);

export default router;
