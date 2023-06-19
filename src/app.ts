import fastify from "fastify";
import { ZodError } from "zod";

import { env } from "./env";
import { mealsRoutes } from "./http/controllers/meals/routes";
import { userRoutes } from "./http/controllers/users/routes";
import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(userRoutes);
app.register(mealsRoutes, { prefix: "/meals" });

// Return errors for all routes
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    const errors = error.issues.map(
      (issue) => `${issue.path.join(",")} ${issue.message}`
    );

    return reply.code(400).send({ message: "Validation error.", errors });
  }

  if (env.NODE_ENV !== "prod") {
    // eslint-disable-next-line no-console
    console.error(error);
  } else {
    // TODO: Add more details to the error
  }

  return reply.code(500).send({ message: error.message });
});
