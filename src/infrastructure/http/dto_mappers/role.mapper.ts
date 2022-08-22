import { Role } from "@src/domain-model/role";
import { RoleDto } from "../dtos/role.dto";

export function roleFromDomain(role: Role): RoleDto {
  const { id, name } = role;
  return {
    id,
    name,
  };
}