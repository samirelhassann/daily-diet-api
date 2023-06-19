import { Meal, Prisma } from "@prisma/client";

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>;

  save(meal: Meal): Promise<Meal>;

  delete(mealId: string): void;

  findById(checkInId: string): Promise<Meal | null>;

  findManyByUserId(userId: string, page: number, size: number): Promise<Meal[]>;

  findAllByUserId(userId: string): Promise<Meal[]>;
}
