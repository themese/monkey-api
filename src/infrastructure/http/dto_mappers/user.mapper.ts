import { User } from "src/domain_model/user";
import { UserDto } from "../dtos/user.dto";

export function userFromDomain(user: User): UserDto {
  const { id, email, roleId, isDeleted } = user;
  return {
    id,
    email,
    roleId,
    isDeleted,
  };
}