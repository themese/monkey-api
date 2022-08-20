import { Inject } from "@nestjs/common";
import { NewUser, User, UserId } from "src/domain_model/user";
import { UserRepository, UserRepositorySymbol } from "src/domain_services/user.repository";

export const UserServiceSymbol = Symbol.for('UserService');

export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: UserRepository,
  ) { }

  async createUser(newUser: NewUser) {
    return await this.userRepository.createUser(newUser);
  };

  async getUser(id: UserId) {
    return await this.userRepository.getUser(id);
  };

  async getUsers() {
    return await this.userRepository.getUsers();
  };

  async updateUser(user: User) {
    return await this.userRepository.updateUser(user);
  };

  async deleteUser(id: UserId) {
    return await this.userRepository.deleteUser(id);
  };
}