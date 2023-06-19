import { expect, it, describe, beforeEach } from "vitest";

import { UserDoesNotExistError } from "../errors/userDoesNotExist";
import { GetMealsHistoryUseCase } from "../getMealsHistoryUseCase";
import { InMemoryMealsRepository } from "@/repositories/inMemory/inMemoryMealsRepository";
import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

let usersRepository: InMemoryUserRepository;
let mealsRepository: InMemoryMealsRepository;
let sut: GetMealsHistoryUseCase;

describe("Given the getMealsHistoryUseCase", () => {
  const createUserUseCasePropsMock = {
    name: "name test",
    password_hash: "password test",
    email: "email test",
  };

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    mealsRepository = new InMemoryMealsRepository();
    sut = new GetMealsHistoryUseCase(mealsRepository, usersRepository);
  });

  it("should list all the history meals of requested user", async () => {
    const quantityMock = 10;

    const user = await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    Array.from({ length: quantityMock }).forEach(async (_, index) => {
      await mealsRepository.create({
        user_id: user.id,
        name: `name ${index}`,
        isOnDiet: true,
      });
    });

    const { meals } = await sut.execute({
      userId: user.id,
      page: 1,
      size: 20,
    });

    expect(meals).toHaveLength(quantityMock);
  });

  it("should throw the UserDoesNotExistError when the userId informed does not exist", async () => {
    await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    await expect(() =>
      sut.execute({
        userId: "test",
        page: 1,
        size: 20,
      })
    ).rejects.toBeInstanceOf(UserDoesNotExistError);
  });
});
