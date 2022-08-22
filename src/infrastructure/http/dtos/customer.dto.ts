import { ApiProperty } from "@nestjs/swagger";
import { CustomerId } from "@src/domain-model/customer";
import { UserId } from "@src/domain-model/user";

export class CustomerDto {
  @ApiProperty()
  id: CustomerId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  photo: string;
  @ApiProperty()
  createdBy: UserId;
  @ApiProperty()
  lastUpdatedBy: UserId;
  @ApiProperty()
  isDeleted: boolean;
}