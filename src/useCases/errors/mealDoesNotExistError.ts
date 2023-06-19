export class MealDoesNotExistError extends Error {
  constructor() {
    super("Meal does not exist for the given user id");
  }
}
