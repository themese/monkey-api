import { ApiProperty } from "@nestjs/swagger";

export type RoleId = number;

export class NewRole {
  @ApiProperty()
  name: string;

  constructor(_name: string) {
    this.name = _name;
  }
}

export class Role extends NewRole {
  @ApiProperty()
  id: RoleId;
  @ApiProperty()
  name: string;

  constructor(
    _id: RoleId,
    _name: string,
  ) {
    super(_name);
    this.id = _id;
  }
}