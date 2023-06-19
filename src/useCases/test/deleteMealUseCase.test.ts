import { expect, it, describe, beforeEach } from "vitest";

import { DeleteMealUseCase } from "../deleteMealUseCase";
import { MealDoesNotExistError } from "../errors/mealDoesNotExistError";
import { UserDoesNotExistError } from "../errors/userDoesNotExist";
import { InMemoryMealsRepository } from "@/repositories/inMemory/inMemoryMealsRepository";
import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

let usersRepository: InMemoryUserRepository;
let mealsRepository: InMemoryMealsRepository;
let sut: DeleteMealUseCase;

describe("Given the deleteMealUseCase", () => {
  const createUserUseCasePropsMock = {
    name: "name test",
    password_hash: "password test",
    email: "email test",
  };

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    mealsRepository = new InMemoryMealsRepository();
    sut = new DeleteMealUseCase(mealsRepository, usersRepository);
  });

  it("should delete the meal", async () => {
    const user = await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    const createdMeal = await mealsRepository.create({
      user_id: user.id,
      name: "meal",
      isOnDiet: true,
    });

    await sut.execute({
      userId: user.id,
      mealId: createdMeal.id,
    });

    const deleted = await mealsRepository.findById(createdMeal.id);

    expect(deleted).to.be.null;
  });

  it("should throw the UserDoesNotExistError when the user informed does not exist", async () => {
    await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    await mealsRepository.create({
      user_id: "meal-user-id",
      name: "meal",
      isOnDiet: true,
    });

    await expect(() =>
      sut.execute({
        userId: "userId-test",
        mealId: "test",
      })
    ).rejects.toBeInstanceOf(UserDoesNotExistError);
  });

  it("should throw the MealDoesNotExistError when the meal does not exist", async () => {
    const user = await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    await mealsRepository.create({
      user_id: user.id,
      name: "meal",
      isOnDiet: true,
    });

    await expect(() =>
      sut.execute({
        userId: user.id,
        mealId: "test",
      })
    ).rejects.toBeInstanceOf(MealDoesNotExistError);
  });

  it("should throw the MealDoesNotExistError when the meal exist but it is from another user id", async () => {
    const user = await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    const user2 = await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    const createdMeal = await mealsRepository.create({
      user_id: user.id,
      name: "meal",
      isOnDiet: true,
    });

    await expect(() =>
      sut.execute({
        userId: user2.id,
        mealId: createdMeal.id,
      })
    ).rejects.toBeInstanceOf(MealDoesNotExistError);
  });
});
