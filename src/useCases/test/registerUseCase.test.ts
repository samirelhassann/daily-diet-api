import { expect, it, describe, beforeEach } from "vitest";

import { UserAlreadyExistsError } from "../errors/userAlreadyExistsError";
import { RegisterUseCase } from "../registerUseCase";
import { InMemoryUserRepository } from "@/repositories/inMemory/inMemoryUsersRepository";

let usersRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe("Given the registerUseCase", () => {
  const useCasePropsMock = {
    name: "name test",
    password: "password test",
    email: "email test",
  };

  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to create a user", async () => {
    const { user } = await sut.execute({ ...useCasePropsMock });

    expect(user).toStrictEqual(
      expect.objectContaining({
        name: useCasePropsMock.name,
        email: useCasePropsMock.email,
      })
    );
  });

  it("should throw the UserAlreadyExistsError when the email informed already exists", async () => {
    await sut.execute({ ...useCasePropsMock });

    await expect(() =>
      sut.execute({ ...useCasePropsMock })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
