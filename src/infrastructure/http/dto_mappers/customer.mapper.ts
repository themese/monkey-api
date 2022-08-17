import { Customer } from "src/domain_model/customer";
import { CustomerDto } from "../dtos/customer.dto";

export function customerFromDomain(customer: Customer): CustomerDto {
  const { id, name, surname, photo } = customer;
  return {
    id,
    name,
    surname,
    photo,
  };
}