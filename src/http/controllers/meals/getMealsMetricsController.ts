import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetMealsMetricsUseCase } from "@/useCases/factories/makeGetMealsMetricsUseCase";

export async function GetMealsMetricsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { sub: userId } = request.user;

  await makeGetMealsMetricsUseCase()
    .execute({
      userId,
    })
    .then((response) => {
      return reply.status(200).send(response);
    });
}
