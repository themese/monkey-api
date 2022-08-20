import { ApiProperty } from "@nestjs/swagger";
import { RoleId } from "src/domain_model/role";
import { UserId } from "src/domain_model/user";

export class UserDto {
  @ApiProperty()
  id: UserId;
  @ApiProperty()
  email: string;
  @ApiProperty()
  roleId: RoleId;
  @ApiProperty()
  isDeleted: boolean;
}