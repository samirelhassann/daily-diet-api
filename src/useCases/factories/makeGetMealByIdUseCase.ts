import { GetMealByIdUseCase } from "../getMealByIdUseCase";
import { PrismaMealsRepository } from "@/repositories/prisma/prismaMealsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

export function makeGetMealByIdUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetMealByIdUseCase(mealsRepository, usersRepository);

  return useCase;
}
