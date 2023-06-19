import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetMealByIdUseCase } from "@/useCases/factories/makeGetMealByIdUseCase";

export async function GetMealByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const schema = z.object({
    mealId: z.string(),
  });

  const { sub: userId } = request.user;

  const { mealId } = schema.parse(request.params);

  await makeGetMealByIdUseCase()
    .execute({
      userId,
      mealId,
    })
    .then((response) => {
      return reply.status(200).send(response);
    });
}
