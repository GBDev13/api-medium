import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import { Router } from "express";
import { makeCreateUserController } from "../factories/controllers/CreateUserControllerFactory";

const userRoutes = Router();

userRoutes.post("/", adaptRoute(makeCreateUserController()));

export { userRoutes };
