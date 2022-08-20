import { ApiProperty } from "@nestjs/swagger";
import { CustomerId } from "src/domain_model/customer";
import { UserId } from "src/domain_model/user";

export class CustomerDto {
  @ApiProperty()
  id: CustomerId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  photo: string; // base64
  @ApiProperty()
  createdBy: UserId;
  @ApiProperty()
  lastUpdatedBy: UserId;
  @ApiProperty()
  isDeleted: boolean;
}