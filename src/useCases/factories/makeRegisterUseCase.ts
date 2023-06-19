import { RegisterUseCase } from "../registerUseCase";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new RegisterUseCase(usersRepository);

  return useCase;
}
