import { ApiProperty } from "@nestjs/swagger";

export type CustomerId = string;

export class NewCustomer {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  photo?: string;
  constructor(
    _name: string,
    _surname: string,
    _photo?: string,
  ) {
    this.name = _name;
    this.surname = _surname;
    this.photo = _photo;
  }
}

export class Customer extends NewCustomer {
  @ApiProperty()
  id: CustomerId;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  photo: string; // base64
  constructor(
    _id: string,
    _name: string,
    _surname: string,
    _photo: string,
  ) {
    super(_name, _surname);
    this.id = _id;
    this.photo = _photo;
  }
}