import { MealsRepository } from "../MealsRepository";
import { prisma } from "@/lib/prisma";
import { Meal, Prisma } from "@prisma/client";

export class PrismaMealsRepository implements MealsRepository {
  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    return prisma.meal.create({ data });
  }

  async save(data: Meal): Promise<Meal> {
    return prisma.meal.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(mealId: string): Promise<Meal> {
    return prisma.meal.delete({
      where: {
        id: mealId,
      },
    });
  }

  async findById(mealId: string): Promise<Meal | null> {
    return prisma.meal.findUnique({
      where: {
        id: mealId,
      },
    });
  }

  async findManyByUserId(
    userId: string,
    page: number,
    size: number
  ): Promise<Meal[]> {
    return prisma.meal.findMany({
      where: {
        user_id: userId,
      },
      take: size,
      skip: (page - 1) * size,
    });
  }

  async findAllByUserId(userId: string): Promise<Meal[]> {
    return prisma.meal.findMany({
      where: {
        user_id: userId,
      },
    });
  }
}
