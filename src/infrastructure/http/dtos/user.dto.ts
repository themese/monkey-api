import { ApiProperty } from "@nestjs/swagger";
import { RoleId } from "@src/domain-model/role";
import { UserId } from "@src/domain-model/user";

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