import { UsersRepository } from "../usersRepository";
import { User, Prisma } from "@prisma/client";

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = [];

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((u) => u.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((u) => u.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async searchMany(query: string, page: number, size: number): Promise<User[]> {
    return this.items
      .filter((item) => item.name.includes(query) || item.email.includes(query))
      .slice((page - 1) * size, page * size);
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: `user-${Math.random().toString(36).substring(7)}`,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
