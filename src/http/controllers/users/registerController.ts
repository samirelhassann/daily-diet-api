import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeRegisterUseCase } from "@/useCases/factories/makeRegisterUseCase";

export async function RegisterController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string().email(),
  });

  await makeRegisterUseCase()
    .execute({
      ...bodySchema.parse(request.body),
    })
    .then(() => {
      return reply.status(201).send();
    });
}
