import { CreateMealUseCase } from "../createMealUseCase";
import { PrismaMealsRepository } from "@/repositories/prisma/prismaMealsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

export function makeCreateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new CreateMealUseCase(mealsRepository, usersRepository);

  return useCase;
}
