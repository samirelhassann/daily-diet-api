import { UserDoesNotExistError } from "./errors/userDoesNotExist";
import { MealsRepository } from "@/repositories/MealsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { Meal } from "@prisma/client";

interface CreateMealUseCaseRequest {
  name: string;
  isOnDiet: boolean;
  userId: string;
}

interface CreateMealUseCaseResponse {
  meal: Meal;
}

export class CreateMealUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    isOnDiet,
    userId,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    {
      const existsUser = await this.usersRepository.findById(userId);

      if (!existsUser) {
        throw new UserDoesNotExistError();
      }

      const meal = await this.mealsRepository.create({
        name,
        isOnDiet,
        user_id: userId,
      });

      return {
        meal,
      };
    }
  }
}
