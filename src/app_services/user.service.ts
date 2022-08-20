import { Inject, NotAcceptableException } from "@nestjs/common";
import { NewUser, User, UserId } from "src/domain_model/user";
import { RoleRepository, RoleRepositorySymbol } from "src/domain_services/role.repository";
import { UserRepository, UserRepositorySymbol } from "src/domain_services/user.repository";

export const UserServiceSymbol = Symbol.for('UserService');

export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: UserRepository,
    @Inject(RoleRepositorySymbol)
    private readonly roleRepository: RoleRepository,
  ) { }

  async createUser(newUser: NewUser, requester: UserId) {
    const isAdmin = await this.isUserAdmin(requester);
    if (!isAdmin) {
      throw new NotAcceptableException('You are not an admin');
    }
    return await this.userRepository.createUser(newUser);
  };

  async getUser(id: UserId, requester: UserId) {
    const isAdmin = await this.isUserAdmin(requester);
    if (!isAdmin) {
      throw new NotAcceptableException('You are not an admin');
    }
    return await this.userRepository.getUser(id);
  };

  async getUsers(requester: UserId) {
    const isAdmin = await this.isUserAdmin(requester);
    if (!isAdmin) {
      throw new NotAcceptableException('You are not an admin');
    }
    return await this.userRepository.getUsers();
  };

  async updateUser(user: User, requester: UserId) {
    const isAdmin = await this.isUserAdmin(requester);
    if (!isAdmin) {
      throw new NotAcceptableException('You are not an admin');
    }
    return await this.userRepository.updateUser(user);
  };

  async deleteUser(id: UserId, requester: UserId) {
    const isAdmin = await this.isUserAdmin(requester);
    if (!isAdmin) {
      throw new NotAcceptableException('You are not an admin');
    }
    return await this.userRepository.deleteUser(id);
  };

  async isUserAdmin(userId: UserId) {
    // This method should be a bit more complex than this. Perhaps integrating a RoleGuard with Auth0's Role. We shouldn't need to send a 'requester' user, with the RoleGuard we could extract the Requester User from the token and validate if it's an admin or not.
    // We are supposing the concept of administrator is equivalent to a Role entity in our DB that has a name of 'admin', but this isn't a fact. We could even create a Role with name 'administrator' and this function will return false.
    const user = await this.userRepository.getUser(userId);
    const { roleId } = user;
    const role = await this.roleRepository.getRole(roleId);
    const res = role.name.toLocaleLowerCase() === 'admin';
    return res;
  }
}