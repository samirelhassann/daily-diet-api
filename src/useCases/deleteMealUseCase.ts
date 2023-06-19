import { MealDoesNotExistError } from "./errors/mealDoesNotExistError";
import { UserDoesNotExistError } from "./errors/userDoesNotExist";
import { MealsRepository } from "@/repositories/MealsRepository";
import { UsersRepository } from "@/repositories/usersRepository";

interface DeleteMealUseCaseRequest {
  userId: string;
  mealId: string;
}

export class DeleteMealUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({ userId, mealId }: DeleteMealUseCaseRequest) {
    {
      const existsUser = await this.usersRepository.findById(userId);

      if (!existsUser) {
        throw new UserDoesNotExistError();
      }

      const meal = await this.mealsRepository.findById(mealId);

      if (!meal || meal.user_id !== userId) {
        throw new MealDoesNotExistError();
      }

      this.mealsRepository.delete(mealId);
    }
  }
}
