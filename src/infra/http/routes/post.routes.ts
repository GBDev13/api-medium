import { Router } from "express";
import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";

import { makeEnsureAuthenticatedMiddleware } from "../factories/middlewares/EnsureAuthenticatedMiddlewareFactory";

import { makeCreatePostController } from "../factories/controllers/CreatePostControllerFactory";
import { makeGetAllPostsController } from "../factories/controllers/GetAllPostsControllerFactory";
import { makeCreateCommentController } from "../factories/controllers/CreateCommentControllerFactory";

const postRoutes = Router();

postRoutes.get("/", adaptRoute(makeGetAllPostsController()));

postRoutes.use(adaptMiddleware(makeEnsureAuthenticatedMiddleware()));

postRoutes.post("/", adaptRoute(makeCreatePostController()));
postRoutes.post("/comment/:postId", adaptRoute(makeCreateCommentController()));

export { postRoutes };
