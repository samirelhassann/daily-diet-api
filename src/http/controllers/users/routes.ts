import { FastifyInstance } from "fastify";

import { AuthenticateController } from "./authenticateController";
import { RegisterController } from "./registerController";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", RegisterController);

  app.post("/auth", AuthenticateController);
}
