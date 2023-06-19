import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeGetMealsHistoryUseCase } from "@/useCases/factories/makeGetMealsHistoryUseCase";

export async function GetMealsHistoryController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const schema = z.object({
    page: z.coerce.number().min(1).default(1),
    size: z.coerce.number().default(20),
  });

  const { sub: userId } = request.user;

  const { page, size } = schema.parse(request.query);

  await makeGetMealsHistoryUseCase()
    .execute({
      userId,
      page,
      size,
    })
    .then((response) => {
      return reply.status(200).send(response);
    });
}
