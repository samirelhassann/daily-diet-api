import { DeleteMealUseCase } from "../deleteMealUseCase";
import { PrismaMealsRepository } from "@/repositories/prisma/prismaMealsRepository";
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";

export function makeDeleteMealUseCase() {
  const mealsRepository = new PrismaMealsRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new DeleteMealUseCase(mealsRepository, usersRepository);

  return useCase;
}
