import { Router } from "express";
import user from "./user";
import room from "./room";

const router = Router();

router.use("/user", user);
router.use("/chat", room);

export default router;
