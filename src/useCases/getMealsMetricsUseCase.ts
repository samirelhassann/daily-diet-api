/* eslint-disable no-restricted-syntax */
import { UserDoesNotExistError } from "./errors/userDoesNotExist";
import { MealsRepository } from "@/repositories/MealsRepository";
import { UsersRepository } from "@/repositories/usersRepository";

interface GetMealsMetricsUseCaseRequest {
  userId: string;
}

interface GetMealsMetricsUseCaseResponse {
  totalMeals: number;
  totalMealsOnDiet: number;
  totalMealsOffDiet: number;
  bestSequenceOnDiet: number;
}

export class GetMealsMetricsUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: GetMealsMetricsUseCaseRequest): Promise<GetMealsMetricsUseCaseResponse> {
    {
      const existsUser = await this.usersRepository.findById(userId);

      if (!existsUser) {
        throw new UserDoesNotExistError();
      }

      const items = await this.mealsRepository.findAllByUserId(userId);

      const { maxSeq } = items
        .sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
        .reduce(
          (acc, curr) => {
            return curr.isOnDiet
              ? {
                  // eslint-disable-next-line no-plusplus
                  maxSeq: Math.max(acc.maxSeq, ++acc.currSeq),
                  currSeq: acc.currSeq,
                }
              : { maxSeq: acc.maxSeq, currSeq: 0 };
          },
          { maxSeq: 0, currSeq: 0 }
        );

      return {
        totalMeals: items.length ?? 0,
        totalMealsOnDiet: items.filter((c) => c.isOnDiet)?.length ?? 0,
        totalMealsOffDiet: items.filter((c) => !c.isOnDiet)?.length ?? 0,
        bestSequenceOnDiet: maxSeq ?? 0,
      };
    }
  }
}
