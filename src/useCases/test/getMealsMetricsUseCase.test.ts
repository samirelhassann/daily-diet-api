import { expect, it, describe, beforeEach } from "vitest";

import { UserDoesNotExistError } from "../errors/userDoesNotExist";
import { GetMealsMetricsUseCase } from "../getMealsMetricsUseCase";
import { InMemoryMealsRepository } from "@/repositories/inMemory/inMemoryMealsRepository";
import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

let usersRepository: InMemoryUserRepository;
let mealsRepository: InMemoryMealsRepository;
let sut: GetMealsMetricsUseCase;

describe("Given the getMealsMetricsUseCase", () => {
  const createUserUseCasePropsMock = {
    name: "name test",
    password_hash: "password test",
    email: "email test",
  };

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    mealsRepository = new InMemoryMealsRepository();
    sut = new GetMealsMetricsUseCase(mealsRepository, usersRepository);
  });

  it("should list all the history meals of requested user", async () => {
    const user = await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    Array.from({ length: 5 }).forEach(async (_, index) => {
      await mealsRepository.create({
        user_id: user.id,
        name: `name ${index}`,
        isOnDiet: false,
      });
    });

    Array.from({ length: 5 }).forEach(async (_, index) => {
      await mealsRepository.create({
        user_id: user.id,
        name: `name actives ${index}`,
        isOnDiet: true,
      });
    });

    const metrics = await sut.execute({
      userId: user.id,
    });

    expect(metrics).toStrictEqual({
      bestSequenceOnDiet: 5,
      totalMeals: 10,
      totalMealsOffDiet: 5,
      totalMealsOnDiet: 5,
    });
  });

  it("should throw the UserDoesNotExistError when the userId informed does not exist", async () => {
    await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    await expect(() =>
      sut.execute({
        userId: "test",
      })
    ).rejects.toBeInstanceOf(UserDoesNotExistError);
  });
});
