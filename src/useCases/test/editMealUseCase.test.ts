import { expect, it, describe, beforeEach } from "vitest";

import { EditMealUseCase } from "../editMealUseCase";
import { MealDoesNotExistError } from "../errors/mealDoesNotExistError";
import { UserDoesNotExistError } from "../errors/userDoesNotExist";
import { InMemoryMealsRepository } from "@/repositories/inMemory/inMemoryMealsRepository";
import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

let usersRepository: InMemoryUserRepository;
let mealsRepository: InMemoryMealsRepository;
let sut: EditMealUseCase;

describe("Given the editMealUseCase", () => {
  const createUserUseCasePropsMock = {
    name: "name test",
    password_hash: "password test",
    email: "email test",
  };

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    mealsRepository = new InMemoryMealsRepository();
    sut = new EditMealUseCase(mealsRepository, usersRepository);
  });

  it("should edit the specific meal", async () => {
    const user = await usersRepository.create({
      ...createUserUseCasePropsMock,
    });

    const createdMeal = await mealsRepository.create({
      user_id: user.id,
      name: "meal",
      isOnDiet: true,
    });

    const meal = await sut.execute({
      userId: user.id,
      mealId: createdMeal.id,
      name: "altered name",
      isOnDiet: false,
    });

    const alteredMeal = await mealsRepository.findById(meal.id);

    expect(alteredMeal).toEqual(
      expect.objectContaining({
        id: createdMeal.id,
        name: "altered name",
        isOnDiet: false,
      })
    );
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
        name: "altered name",
        isOnDiet: false,
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
        name: "altered name",
        isOnDiet: false,
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
        name: "altered name",
        isOnDiet: false,
      })
    ).rejects.toBeInstanceOf(MealDoesNotExistError);
  });
});
