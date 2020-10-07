import { Router } from "express";
import { tryCatchMiddleware } from "../middlewares/tryCatch";
import * as controller from "../controllers/user";

const router = Router();

router.post("/", tryCatchMiddleware.Error(controller.register));
router.post("/login", tryCatchMiddleware.Error(controller.login));

export default router;
