import { notfound } from "./notfound"
import { errorHandler } from "./errorHandler"
import { authenticate, authorize } from "./auth";

export const middlewares = {
    notfound,
    errorHandler,
    authenticate,
    authorize
};