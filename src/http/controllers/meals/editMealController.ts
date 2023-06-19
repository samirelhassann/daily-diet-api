import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeEditMealUseCase } from "@/useCases/factories/makeEditMealUseCase";

export async function EditMealController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    mealId: z.string(),
  });

  const bodySchema = z.object({
    name: z.string(),
    isOnDiet: z.boolean(),
  });

  const { sub: userId } = request.user;

  const { mealId } = paramsSchema.parse(request.params);

  const { name, isOnDiet } = bodySchema.parse(request.body);

  await makeEditMealUseCase()
    .execute({
      userId,
      mealId,
      name,
      isOnDiet,
    })
    .then((response) => {
      return reply.status(200).send(response);
    });
}
