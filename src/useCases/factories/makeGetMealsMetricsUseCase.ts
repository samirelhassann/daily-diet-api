import { GetMealsMetricsUseCase } from "../getMealsMetricsUseCase";
import { PrismaMealsRepository } from "@/repositories/prisma/prismaMealsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

export function makeGetMealsMetricsUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetMealsMetricsUseCase(mealsRepository, usersRepository);

  return useCase;
}
