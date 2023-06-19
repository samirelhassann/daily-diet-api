import { expect, it, describe, beforeEach } from "vitest";

import { CreateMealUseCase } from "../createMealUseCase";
import { UserDoesNotExistError } from "../errors/userDoesNotExist";
import { InMemoryMealsRepository } from "@/repositories/inMemory/inMemoryMealsRepository";
import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

let usersRepository: InMemoryUserRepository;
let mealsRepository: InMemoryMealsRepository;
let sut: CreateMealUseCase;

describe("Given the createMealUsecase", () => {
  const createUserUseCasePropsMock = {
    name: "name test",
    password_hash: "password test",
    email: "email test",
  };

  const createMealUseCasePropsMock = {
    name: "name",
    isOnDiet: true,
  };

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    mealsRepository = new InMemoryMealsRepository();
    sut = new CreateMealUseCase(mealsRepository, usersRepository);
  });

  it("should be able to create a meal", async () => {
    const user = await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    const { meal } = await sut.execute({
      ...createMealUseCasePropsMock,
      userId: user.id,
    });

    expect(meal).toStrictEqual(
      expect.objectContaining({
        name: createMealUseCasePropsMock.name,
        isOnDiet: createMealUseCasePropsMock.isOnDiet,
        user_id: user.id,
      })
    );
  });

  it("should throw the UserDoesNotExistError when the userId informed does not exist", async () => {
    await expect(() =>
      sut.execute({
        ...createMealUseCasePropsMock,
        userId: "test",
      })
    ).rejects.toBeInstanceOf(UserDoesNotExistError);
  });
});
