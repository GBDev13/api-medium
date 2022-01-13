import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import { Router } from "express";
import { makeCreatePostController } from "../factories/controllers/CreatePostControllerFactory";
import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";

const postRoutes = Router();

postRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

postRoutes.post("/", adaptRoute(makeCreatePostController()));

export { postRoutes };
