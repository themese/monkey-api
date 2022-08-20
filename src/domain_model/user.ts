import { ApiProperty } from "@nestjs/swagger";
import { RoleId } from "./role";

export type UserId = number;

export class NewUser {
  @ApiProperty()
  email: string;
  @ApiProperty()
  roleId: RoleId;

  constructor(
    _email: string,
    _roleId: RoleId,
  ) {
    this.email = _email;
    this.roleId = _roleId;
  }
}

export class User extends NewUser {
  @ApiProperty()
  id: UserId;
  @ApiProperty()
  email: string;
  @ApiProperty()
  roleId: RoleId;
  @ApiProperty()
  isDeleted: boolean;

  constructor(
    _id: UserId,
    _email: string,
    _roleId: RoleId,
    _isDeleted: boolean,
  ) {
    super(_email, _roleId);
    this.id = _id;
    this.isDeleted = _isDeleted;
  }
}