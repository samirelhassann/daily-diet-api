import { FastifyInstance } from "fastify";

import { CreateMealController } from "./createMealController";
import { DeleteMealController } from "./deleteMealController";
import { EditMealController } from "./editMealController";
import { GetMealByIdController } from "./getMealByIdController";
import { GetMealsHistoryController } from "./getMealsHistoryController";
import { GetMealsMetricsController } from "./getMealsMetricsController";
import verifyJwt from "@/http/middlewares/verifyJwt";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/", CreateMealController);
  app.get("/history", GetMealsHistoryController);
  app.get("/:mealId", GetMealByIdController);
  app.delete("/:mealId", DeleteMealController);
  app.put("/:mealId", EditMealController);
  app.get("/metrics", GetMealsMetricsController);
}
