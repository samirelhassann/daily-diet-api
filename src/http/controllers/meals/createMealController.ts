import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateMealUseCase } from "@/useCases/factories/makeCreateMealUseCase";

export async function CreateMealController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    name: z.string(),
    isOnDiet: z.boolean(),
  });

  const { sub: userId } = request.user;

  const { name, isOnDiet } = bodySchema.parse(request.body);

  await makeCreateMealUseCase()
    .execute({
      name,
      isOnDiet,
      userId,
    })
    .then(() => {
      return reply.status(201).send();
    });
}
