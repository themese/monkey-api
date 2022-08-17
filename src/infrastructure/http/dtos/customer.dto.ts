import { ApiProperty } from "@nestjs/swagger";
import { CustomerId } from "src/domain_model/customer";

export class CustomerDto {
  @ApiProperty()
  id: CustomerId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  photo: string; // base64
}