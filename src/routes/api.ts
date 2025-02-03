import { Router } from "express";
import ApiController from "../controllers/apiController";

const apiRouter: Router = Router();
const controller: ApiController = new ApiController();

apiRouter.post("/shorten", controller.createShortUrl);
apiRouter.get("/shorten/:shortCode", controller.retrieveOriginalUrl);
apiRouter.put("/shorten/:shortCode", controller.updateShortUrl);
apiRouter.delete("/shorten/:shortCode", controller.deleteShortUrl);
apiRouter.get("/shorten/:shortCode/stats", controller.getUrlStatistics);

export default apiRouter;
