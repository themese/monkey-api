import { Inject } from "@nestjs/common";
import { NewRole, Role, RoleId } from "@src/domain-model/role";
import { RoleRepository, RoleRepositorySymbol } from "@src/domain-services/role.repository";

export const RoleServiceSymbol = Symbol.for('RoleService');

export class RoleService {
  constructor(
    @Inject(RoleRepositorySymbol)
    private readonly roleRepository: RoleRepository,
  ) { }

  async createRole(newRole: NewRole) {
    return await this.roleRepository.createRole(newRole);
  };

  async getRole(id: RoleId) {
    return await this.roleRepository.getRole(id);
  };

  async getRoles() {
    return await this.roleRepository.getRoles();
  };

  async updateRole(role: Role) {
    return await this.roleRepository.updateRole(role);
  };

  async deleteRole(id: RoleId) {
    return await this.roleRepository.deleteRole(id);
  };
}