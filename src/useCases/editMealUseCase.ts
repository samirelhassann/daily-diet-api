import { MealDoesNotExistError } from "./errors/mealDoesNotExistError";
import { UserDoesNotExistError } from "./errors/userDoesNotExist";
import { MealsRepository } from "@/repositories/MealsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { Meal } from "@prisma/client";

interface EditMealUseCaseRequest {
  userId: string;
  mealId: string;
  name: string;
  isOnDiet: boolean;
}

export class EditMealUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    mealId,
    name,
    isOnDiet,
  }: EditMealUseCaseRequest): Promise<Meal> {
    {
      const existsUser = await this.usersRepository.findById(userId);

      if (!existsUser) {
        throw new UserDoesNotExistError();
      }

      const meal = await this.mealsRepository.findById(mealId);

      if (!meal || meal.user_id !== userId) {
        throw new MealDoesNotExistError();
      }

      const alteredMeal = { ...meal, name, isOnDiet };

      return this.mealsRepository.save(alteredMeal);
    }
  }
}
