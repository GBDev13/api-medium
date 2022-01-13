import { Router } from "express";

import { sessionsRoutes } from "./sessions.routes";
import { userRoutes } from "./user.routes";
import { postRoutes } from "./post.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/posts", postRoutes);

export { router };
