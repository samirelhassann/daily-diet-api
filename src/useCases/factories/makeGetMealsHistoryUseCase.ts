import { GetMealsHistoryUseCase } from "../getMealsHistoryUseCase";
import { PrismaMealsRepository } from "@/repositories/prisma/prismaMealsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

export function makeGetMealsHistoryUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetMealsHistoryUseCase(mealsRepository, usersRepository);

  return useCase;
}
