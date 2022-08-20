import { ApiProperty } from "@nestjs/swagger";
import { UserId } from "./user";

export type CustomerId = number;

export class NewCustomer {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  photo: string;
  constructor(
    _name: string,
    _surname: string,
    _photo: string,
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
  @ApiProperty()
  createdBy: UserId;
  @ApiProperty()
  lastUpdatedBy: UserId;
  @ApiProperty()
  isDeleted: boolean;
  constructor(
    _id: UserId,
    _name: string,
    _surname: string,
    _createdBy: UserId,
    _lastUpdatedBy: UserId,
    _photo: string,
    _isDeleted: boolean,
  ) {
    super(_name, _surname, _photo);
    this.id = _id;
    this.createdBy = _createdBy;
    this.lastUpdatedBy = _lastUpdatedBy;
    this.isDeleted = _isDeleted;
  }
}