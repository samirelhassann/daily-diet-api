/* eslint-disable consistent-return */
import { FastifyReply, FastifyRequest } from "fastify";

const verifyJwt = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (e) {
    return reply.code(401).send({
      message: "Unauthorized",
    });
  }
};

export default verifyJwt;
