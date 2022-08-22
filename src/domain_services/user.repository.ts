import { NewUser, User, UserId } from "@src/domain-model/user";

export const UserRepositorySymbol = Symbol.for('UserRepository');

export interface UserRepository {
  createUser: (newUser: NewUser) => Promise<User>;
  getUser: (id: UserId) => Promise<User>;
  getUsers: () => Promise<User[]>;
  updateUser: (user: User) => Promise<User>;
  deleteUser: (id: UserId) => Promise<User>;
}