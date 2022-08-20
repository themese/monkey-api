import { NewRole, Role, RoleId } from "src/domain_model/role";

export const RoleRepositorySymbol = Symbol.for('RoleRepository');

export interface RoleRepository {
  createRole: (newRole: NewRole) => Promise<Role>;
  getRole: (id: RoleId) => Promise<Role>;
  getRoles: () => Promise<Role[]>;
  updateRole: (role: Role) => Promise<Role>;
  deleteRole: (id: RoleId) => Promise<void>;
}