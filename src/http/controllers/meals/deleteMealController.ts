import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeDeleteMealUseCase } from "@/useCases/factories/makeDeleteMealUseCase";

export async function DeleteMealController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const schema = z.object({
    mealId: z.string(),
  });

  const { sub: userId } = request.user;

  const { mealId } = schema.parse(request.params);

  await makeDeleteMealUseCase()
    .execute({
      userId,
      mealId,
    })
    .then(() => {
      return reply.status(200).send();
    });
}
