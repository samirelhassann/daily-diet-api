import { UserDoesNotExistError } from "./errors/userDoesNotExist";
import { MealsRepository } from "@/repositories/MealsRepository";
import { UsersRepository } from "@/repositories/usersRepository";
import { Meal } from "@prisma/client";

interface GetMealsHistoryUseCaseRequest {
  userId: string;
  page: number;
  size: number;
}

interface GetMealsHistoryUseCaseResponse {
  meals: Meal[];
}

export class GetMealsHistoryUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    page,
    size,
  }: GetMealsHistoryUseCaseRequest): Promise<GetMealsHistoryUseCaseResponse> {
    {
      const existsUser = await this.usersRepository.findById(userId);

      if (!existsUser) {
        throw new UserDoesNotExistError();
      }

      const meals = await this.mealsRepository.findManyByUserId(
        userId,
        page,
        size
      );

      return {
        meals,
      };
    }
  }
}
