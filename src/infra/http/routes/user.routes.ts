import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import { Router } from "express";

import { makeCreateUserController } from "../factories/controllers/CreateUserControllerFactory";
import { makeGetAllUsersController } from "../factories/controllers/GetAllUsersControllerFactory";
import { makeCreateFollowController } from "../factories/controllers/CreateFollowControllerFactory";

import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";

const userRoutes = Router();

userRoutes.get("/", adaptRoute(makeGetAllUsersController()));
userRoutes.post("/", adaptRoute(makeCreateUserController()));

userRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

userRoutes.post(
  "/follow/:followerId",
  adaptRoute(makeCreateFollowController())
);

export { userRoutes };
