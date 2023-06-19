import { MealDoesNotExistError } from "./errors/mealDoesNotExistError";
import { UserDoesNotExistError } from "./errors/userDoesNotExist";
import { MealsRepository } from "@/repositories/MealsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { Meal } from "@prisma/client";

interface GetMealByIdUseCaseRequest {
  userId: string;
  mealId: string;
}

export class GetMealByIdUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({ userId, mealId }: GetMealByIdUseCaseRequest): Promise<Meal> {
    {
      const existsUser = await this.usersRepository.findById(userId);

      if (!existsUser) {
        throw new UserDoesNotExistError();
      }

      const meal = await this.mealsRepository.findById(mealId);

      if (!meal || meal.user_id !== userId) {
        throw new MealDoesNotExistError();
      }

      return meal;
    }
  }
}
