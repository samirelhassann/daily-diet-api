import { hash } from "bcryptjs";

import { UserAlreadyExistsError } from "./errors/userAlreadyExistsError";
import { UsersRepository } from "@/repositories/usersRepository";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  password: string;
  email: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    password,
    email,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    {
      const existsUser = await this.usersRepository.findByEmail(email);

      if (existsUser) {
        throw new UserAlreadyExistsError();
      }

      const passwordHash = await hash(password, 5);

      const user = await this.usersRepository.create({
        name,
        password_hash: passwordHash,
        email,
      });

      return {
        user,
      };
    }
  }
}
