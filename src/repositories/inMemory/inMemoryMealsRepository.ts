import { MealsRepository } from "../MealsRepository";
import { Prisma, Meal } from "@prisma/client";

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = [];

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal = {
      id: `meal-${Math.random().toString(36).substring(7)}`,
      name: data.name,
      isOnDiet: data.isOnDiet,
      user_id: data.user_id,
      created_at: new Date(),
    };

    this.items.push(meal);

    return meal;
  }

  async save(meal: Meal): Promise<Meal> {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id);

    if (mealIndex >= 0) {
      this.items[mealIndex] = meal;
    }

    return meal;
  }

  async delete(mealId: string) {
    this.items = this.items.filter((item) => item.id !== mealId);
  }

  async findById(mealId: string): Promise<Meal | null> {
    return this.items.find((c) => c.id === mealId) ?? null;
  }

  async findManyByUserId(
    userId: string,
    page: number,
    size: number
  ): Promise<Meal[]> {
    return this.items
      .filter((c) => c.user_id === userId)
      .slice((page - 1) * size, page * size);
  }

  async findAllByUserId(userId: string): Promise<Meal[]> {
    return this.items.filter((c) => c.user_id === userId);
  }
}
