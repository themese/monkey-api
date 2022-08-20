import { ApiProperty } from "@nestjs/swagger";
import { RoleId } from "src/domain_model/role";

export class RoleDto {
  @ApiProperty()
  id: RoleId;
  @ApiProperty()
  name: string;
}